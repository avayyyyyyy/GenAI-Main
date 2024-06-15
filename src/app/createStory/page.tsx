import { auth } from "@/utils/auth";
import { CreateStoryForm } from "@/components/create-story-form";
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

  if (!isIphotoAvailable?.providedImage) {
    return redirect("/addPhoto");
  }

  return (
    <div className="min-h-screen">
      <div className="text-center font-semibold text-5xl mb-10">
        Create your story!
      </div>
      <hr className="my-10 text-pink-700" />
      <CreateStoryForm />
    </div>
  );
}

export default page;
