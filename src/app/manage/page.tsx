import { auth } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/utils/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import DeleteStory from "@/components/DeleteStory";

const app = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    return redirect("/");
  }

  const findUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  const stories = await prisma.story.findMany({
    where: {
      userId: findUser?.id,
    },
  });

  const finalversion = stories.filter((e) => {
    return e.body !== null && e.mainImage !== null;
  });

  return (
    <div className=" min-h-[80vh]">
      <div className="text-4xl text-center font-bold my-10">Manage Stories</div>
      <div className="flex justify-start items-center flex-wrap gap-8">
        {finalversion.length > 0 ? (
          finalversion.map((e) => {
            return (
              <div
                key={e.id}
                className="relative flex flex-col mt-6 text-gray-700 border border-pink-700  bg-white shadow-md bg-clip-border rounded-xl w-96"
              >
                <div className="p-6">
                  <h5 className="block mb-2 font-sans text-sm antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {e.title?.slice(0,60)}...
                  </h5>
                  <p className="block font-sans text-xs antialiased font-light leading-relaxed text-inherit">
                    {e.body?.slice(0, 168)}...
                  </p>
                </div>
                <div className="flex p-6 pt-0 gap-3 items-center">
                  <Link href={`/story/${e.id}`}>
                    <Button size={"sm"} className="bg-pink-800 hover:bg-pink-900">
                      View Story
                    </Button>
                  </Link>
                  <DeleteStory id={e.id} />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center w-full">
            No Stories Found! Create a one now.
          </div>
        )}
      </div>
    </div>
  );
};

export default app;
