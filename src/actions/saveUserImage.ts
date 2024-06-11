"use server";

import { auth } from "@/utils/auth";
import prisma from "@/utils/db";

export const saveUserProvidedImage = async (url: string) => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("User Not Authorized!");
    }

    const userImage = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        providedImage: url,
      },
    });

    console.log(userImage);

    return { success: true, userImage };
  } catch (error) {
    console.error("Error saving user provided image:", error);
    return {
      success: false,
      message: "Failed to save user provided image. Please try again later.",
    };
  }
};
