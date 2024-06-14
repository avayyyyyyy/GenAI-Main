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
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("User Not Authorized!");
  }

  if (!title || !illustrationType || !language || !ageGroup) {
    throw new Error("Fill all fields!");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  console.log(user.id);

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

  if (!createdStory || !createdStory.id) {
    throw new Error("Story creation failed, ID is undefined");
  }
  console.log("createdStory.id:", createdStory.id);

  try {
    let response;
    while (true) {
      try {
        const res = await GenerateBody({
          prompt: createdStory.title,
          age: createdStory.age,
          moral: createdStory.moral || "",
          language: createdStory.language,
        });
        response = JSON.parse(res);
        break;
      } catch (error) {
        console.error("Error parsing JSON response:", error);
      }
    }

    const updatedStoryWithBody = await prisma.story.update({
      where: { id: createdStory.id },
      data: { body: response.story },
    });

    console.log("updatedStoryWithBody: ", updatedStoryWithBody);

    const mainImage = await generateImageFromReplicate({
      prompt: updatedStoryWithBody.body!,
      age: updatedStoryWithBody.age,
      illustrationType: updatedStoryWithBody.illustration,
      gender,
    });

    console.log("mainImage: ", mainImage);

    const firstImage = mainImage.split(" **** ")[0];

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
      userImageRequestId = responseData.data.request_id;
      console.log("IMAGE ID: ", userImageRequestId);
    }

    const finalStory = await prisma.story.update({
      where: { id: createdStory.id },
      data: {
        mainImage: mainImage,
        userImage: userImageRequestId,
      },
    });

    console.log(finalStory.title);

    return finalStory;
  } catch (error) {
    console.error("Error creating story:", error);
    throw new Error("Failed to create story. Please try again later.");
  }
};
