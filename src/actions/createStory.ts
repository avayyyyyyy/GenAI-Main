"use server";
import { auth } from "@/utils/auth";
import prisma from "@/utils/db";
import { GenerateBody } from "@/utils/gemini";
import { generateImageFromReplicate } from "@/utils/replicate";

export const createStory = async ({
  title,
  moral,
  language,
  ageGroup,
  illustrationType,
  gender,
}: {
  title: string;
  moral: string;
  language: string;
  ageGroup: string;
  illustrationType: string;
  gender: string;
}) => {
  console.log("Starting createStory function");

  try {
    const session = await auth();
    console.log("User session obtained:", session);

    if (!session?.user?.email) {
      throw new Error("User Not Authorized!");
    }

    if (!title || !illustrationType || !language || !ageGroup) {
      throw new Error("Fill all fields!");
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    console.log("User fetched from database:", user);

    if (!user) {
      throw new Error("User not found");
    }

    const createdStory = await prisma.story.create({
      data: {
        title,
        moral,
        illustration: illustrationType,
        language,
        age: ageGroup,
        userId: user.id,
      },
    });
    console.log("Story created:", createdStory);

    if (!createdStory || !createdStory.id) {
      throw new Error("Story creation failed, ID is undefined");
    }

    let response;
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        console.log("Generating story body attempt:", attempts + 1);
        const res = await GenerateBody({
          prompt: createdStory.title,
          age: createdStory.age,
          moral: createdStory.moral || "",
          language: createdStory.language!,
          gender: gender,
        });
        response = JSON.parse(res);
        console.log("Generated story body response:", response);
        break;
      } catch (error) {
        attempts++;
        console.error("Error generating story body:", error);
        if (attempts === maxAttempts) {
          throw new Error(
            "Failed to generate story body after multiple attempts"
          );
        }
      }
    }

    const updatedStoryWithBody = await prisma.story.update({
      where: { id: createdStory.id },
      data: { body: response.story },
    });
    console.log("Story updated with body:", updatedStoryWithBody);

    const mainImage = await generateImageFromReplicate({
      prompt: updatedStoryWithBody.body!,
      age: updatedStoryWithBody.age,
      illustrationType: updatedStoryWithBody.illustration,
      gender,
    });
    console.log("Main image generated:", mainImage);

    const firstImage = mainImage.split(" **** ")[0];
    console.log("First image URL extracted:", firstImage);

    let userImageRequestId = null;
    if (user.providedImage) {
      const requestBody = {
        model: "FACESWAP",
        payload: {
          video: firstImage,
          image: user.providedImage,
        },
      };

      const licaAPI = process.env.LICA_API;
      console.log("Sending request to Lica API");

      const resp = await fetch("https://api.lica.world/api/v1/ml-requests/", {
        method: "POST",
        headers: {
          "x-api-key": licaAPI!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!resp.ok) {
        throw new Error("Failed to request image swap");
      }

      const responseData = await resp.json();
      console.log("Lica API response data:", responseData);
      userImageRequestId = responseData.data.request_id;
    }

    const finalStory = await prisma.story.update({
      where: { id: createdStory.id },
      data: {
        mainImage: mainImage,
        userImage: userImageRequestId,
      },
    });
    console.log("Final story updated with images:", finalStory);

    return finalStory;
  } catch (error) {
    console.error("Error in createStory function:", error);
    throw new Error("Failed to create story. Please try again later.");
  }
};
