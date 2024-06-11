import { auth } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/utils/db";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import ImageToShow from "@/components/Imgagetoshow";
import { AudioPlayer } from "@/components/AudioPlayer";

async function page({ params }: { params: { id: string } }) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return redirect("/");
    }

    const story = await prisma.story.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!story) {
      console.error("Story not found");
      return redirect("/not-found");
    }

    console.log(story);

    let swappedImage = null;
    if (story.userImage) {
      try {
        const faceSwappedImageResponse = await fetch(
          `https://api.lica.world/api/v1/ml-requests/${story.userImage}/`,
          {
            headers: {
              "x-api-key": "ZRSJQhlxc3i2tZL6BPqNHLvFCqLOyaT6",
              "Content-Type": "application/json",
            },
          }
        );

        if (!faceSwappedImageResponse.ok) {
          throw new Error("Failed to fetch face-swapped image");
        }

        const swappedImageres = await faceSwappedImageResponse.json();

        if (swappedImageres?.data?.response?.video_url) {
          swappedImage = swappedImageres.data.response.video_url;
        } else {
          console.error("Unexpected response structure:", swappedImageres);
        }
      } catch (error) {
        console.error("Error fetching face-swapped image:", error);
      }
    }

    return (
      <div className="max-w-[40vw] my-20 mx-auto border border-primary/40 shadow-2xl p-4 rounded-lg">
        <div className="text-center text-2xl px-3 font-bold mb-4">
          {story.title}
        </div>
        <ImageToShow
          mainImage={story.mainImage!}
          swappedImage={swappedImage}
          title={story.title}
        />
        <div className="text-lg px-2 text-center">{story.body}</div>
        <div className="flex flex-col gap-4 justify-center my-4">
          <AudioPlayer audioID={story.audioID!} storyBody={story.body || ""} />
          <Link href="/" className="flex items-center w-full">
            <Button className="w-full">
              Create More Stories
              <Home className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in page function:", error);
    return redirect("/");
  }
}

export default page;
