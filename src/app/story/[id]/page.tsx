import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/db";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function page({ params }: { params: { id: string } }) {
  console.log(params.id);

  const session = await auth();

  if (!session?.user?.email) {
    return redirect("/");
  }

  const story = await prisma.story.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <div className="max-w-[40vw] my-20  mx-auto border border-primary/40 shadow-2xl  p-4 rounded-lg">
      <div className="text-center text-4xl font-bold mb-4">{story?.title}</div>
      <div className="flex justify-center my-4">
        <Image
          width={400}
          height={400}
          className="rounded-lg"
          src={story?.mainImage!}
          alt={story?.title!}
        />
      </div>
      <div className="text-lg px-2 text-center">{story?.body}</div>
      <div className="flex justify-center my-4">
        <Link href={"/"} className="flex items-center">
          <Button>
            Create More Stories
            <Home className="ml-2" size={16} />{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default page;
