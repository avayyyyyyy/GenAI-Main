"use server";

import { auth } from "@/utils/auth";
import prisma from "@/utils/db";

export const saveUserProvidedImage = async (url: string) => {
  const session = await auth();
  const userImage = await prisma.user.update({
    where: {
      email: session?.user?.email!,
    },
    data: {
      providedImage: url,
    },
  });

  console.log(userImage);

  return { success: true, userImage };
};
