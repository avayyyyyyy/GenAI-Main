"use server";
import prisma from "@/utils/db";

export async function deleteStory(id: string) {
  try {
    const deleted = await prisma.story.delete({
      where: {
        id,
      },
    });

    return { error: false };
  } catch (err) {
    console.log(err);
    return { error: true };
  }
}
