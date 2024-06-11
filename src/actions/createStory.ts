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
}: {
  title: string;
  moral: string;
  language: string;
  ageGroup: string;
  illustrationType: string;
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

  const res = await GenerateBody({
    prompt: createdStory.title,
    age: createdStory.age,
    moral: createdStory.moral || "",
    language: createdStory.language!,
  });

  const response = JSON.parse(res);
  const updatedStoryWithBody = await prisma.story.update({
    where: { id: createdStory.id },
    data: { body: response.story },
  });

  const mainImage = await generateImageFromReplicate({
    prompt: updatedStoryWithBody.title,
    age: updatedStoryWithBody.age,
    illustrationType: updatedStoryWithBody.illustration,
  });

  let userImageRequestId = null;
  if (user?.providedImage) {
    const requestBody = {
      model: "FACESWAP",
      payload: {
        video: mainImage,
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
};
