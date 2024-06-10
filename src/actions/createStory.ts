"use server";
import { auth } from "@/auth";
import prisma from "@/db";
import { GenerateBody } from "@/gemini";
import { generateImageFromReplicate } from "@/replicate";

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

  console.log({
    title,
    moral,
    language,
    ageGroup,
    illustrationType,
  });

  if (!moral) {
    const createdStory = await prisma.story.create({
      data: {
        title,
        illustration: illustrationType,
        language,
        age: ageGroup,
      },
    });

    const res = await GenerateBody({
      prompt: createdStory.title,
      age: createdStory.age,
      moral: createdStory.moral!,
      language: createdStory.language!,
    });

    console.log(JSON.parse(res));

    const response = JSON.parse(res);

    const updatedStoryWithBody = await prisma.story.update({
      where: {
        id: createdStory.id,
      },
      data: {
        body: response.story,
      },
    });

    const mainImage = await generateImageFromReplicate({
      prompt: updatedStoryWithBody.title,
      age: updatedStoryWithBody.age,
      illustrationType: updatedStoryWithBody.illustration,
    });

    console.log(mainImage);

    const inserImage = await prisma.story.update({
      where: {
        id: createdStory.id,
      },
      data: {
        mainImage: mainImage,
      },
    });

    return inserImage;
  }

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
    moral: createdStory.moral!,
    language: createdStory.language!,
  });

  console.log(JSON.parse(res));

  const response = JSON.parse(res);

  const updatedStoryWithBody = await prisma.story.update({
    where: {
      id: createdStory.id,
    },
    data: {
      body: response.story,
    },
  });
  const mainImage = await generateImageFromReplicate({
    prompt: updatedStoryWithBody.title,
    age: updatedStoryWithBody.age,
    illustrationType: updatedStoryWithBody.illustration,
  });

  console.log(mainImage);

  const inserImage = await prisma.story.update({
    where: {
      id: createdStory.id,
    },
    data: {
      mainImage: mainImage,
    },
  });

  return inserImage;
};
