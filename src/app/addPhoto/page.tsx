import UploadImage from "@/components/UploadPhoto";
import { auth } from "@/utils/auth";
import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await auth();

  if (!session?.user?.email) {
    return redirect("/");
  }

  const isIphotoAvailable = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      providedImage: true,
    },
  });

  console.log(isIphotoAvailable);

  if (isIphotoAvailable?.providedImage) {
    return redirect("/createStory");
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-6xl font-bold">Upload Your Image</div>
      <div className="mt-4 text-sm">Please Upload your image first!</div>
      <div>
        <UploadImage />
      </div>
    </div>
  );
}

export default page;
