import { auth } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/utils/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const app = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    return redirect("/");
  }

  const stories = await prisma.story.findMany();

  console.log(stories);

  return (
    <div>
      <div className="text-4xl text-center font-bold my-10">Manage Stories</div>
      <div className="flex flex-wrap gap-3 ">
        {stories.map((e) => {
          return (
            <div
              key={e.id}
              className="border flex flex-col  p-4 border-primary justify-between min-h-32  min-w-48 rounded-lg"
            >
              <div>
                {e.title.length > 20 ? `${e.title.slice(0, 20)}...` : e.title}
              </div>
              <Link href={`/story/${e.id}`}>
                <Button className="w-full">view</Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default app;
