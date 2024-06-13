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

  const createdStory = await prisma.story.create({
    data: {
      title,
      moral,
      illustration: illustrationType,
      language,
      age: ageGroup,
    },
  });

  let response;
  try {
    let res;
    while (true) {
      try {
        res = await GenerateBody({
          prompt: createdStory.title,
          age: createdStory.age,
          moral: createdStory.moral || "",
          language: createdStory.language!,
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

    const mainImage = await generateImageFromReplicate({
      prompt: updatedStoryWithBody.title,
      age: updatedStoryWithBody.age,
      illustrationType: updatedStoryWithBody.illustration,
      gender,
    });

    console.log(mainImage);

    const first = mainImage.split(" **** ");

    console.log(first[0]);

    let userImageRequestId = null;
    if (user?.providedImage) {
      const requestBody = {
        model: "FACESWAP",
        payload: {
          video: first[0],
          image: user.providedImage,
        },
      };

      const resp = await fetch("https://api.lica.world/api/v1/ml-requests/", {
        method: "POST",
        headers: {
          "x-api-key": "ZRSJQhlxc3i2tZL6BPqNHLvFCqLOyaT6",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!resp.ok) {
        throw new Error("Failed to request image swap");
      }

      const responseData = await resp.json();
      userImageRequestId = responseData.data.request_id;
    }

    const finalStory = await prisma.story.update({
      where: { id: createdStory.id },
      data: {
        mainImage: mainImage,
        userImage: userImageRequestId,
      },
    });

    return finalStory;
  } catch (error) {
    console.error("Error creating story:", error);
    throw new Error("Failed to create story. Please try again later.");
  }
};
