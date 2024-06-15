import { auth } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/utils/db";
import { Home } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import ImageToShow from "@/components/Imgagetoshow";
import { AudioPlayer } from "@/components/AudioPlayer";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Separator } from "@radix-ui/react-select";

const DownloadPdfButton = dynamic(
  () => import("@/components/DownloadPdfButton"),
  {
    ssr: false,
  }
);

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

    const licaAPI = process.env.LICA_API;

    let swappedImage = null;
    if (story.userImage) {
      try {
        const faceSwappedImageResponse = await fetch(
          `https://api.lica.world/api/v1/ml-requests/${story.userImage}/`,
          {
            headers: {
              "x-api-key": licaAPI!,
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

    const firstImage = story.mainImage?.split(" **** ")[0];

    const allImages = story.mainImage?.split(" **** ");

    const secondImage = story.mainImage?.split(" **** ")[1];
    const thirdImage = story.mainImage?.split(" **** ")[2].split(" ****")[0];

    console.log(thirdImage);

    // Split story body into paragraphs
    const paras = story.body?.split(". ");

    // Ensure we have an array of paragraphs
    const paragraphs = paras || [];

    // Calculate number of paragraphs per part
    const partSize = Math.ceil(paragraphs.length / 3);

    // Slice the paragraphs into three parts
    const first = paragraphs.slice(0, partSize);
    const second = paragraphs.slice(partSize, partSize * 2);
    const third = paragraphs.slice(partSize * 2);

    console.log(first);
    console.log(second);
    console.log(third);

    return (
      <>
        <div
          id="story-content"
          className="w-[210mm] h-fit p-4 mx-auto border border-pink-800 shadow-2xl rounded-lg"
        >
          <div className="text-center text-3xl px-3  font-bold mb-8">
            {story.title}
          </div>
          <ImageToShow
            mainImage={firstImage!}
            swappedImage={swappedImage}
            title={story.title}
          />
          <div className="text-lg px-2 text-center">{first.join(". ")}</div>
          <br></br>
          <Image
            width={300}
            height={300}
            className="rounded-lg mx-auto mb-5"
            src={secondImage!}
            alt={"image"}
          />
          <div className="text-lg px-2 text-center">{second.join(". ")}</div>
          <br></br>
          <Image
            width={300}
            height={300}
            className="rounded-lg mx-auto mb-5"
            src={thirdImage!}
            alt={"image"}
          />
          <div className="text-lg px-2 text-center">{third.join(". ")}</div>
          <div className="text-pink-800 text-center opacity-50 font-semibold  mt-10">
            ---- @StoryDevs ----
          </div>
        </div>
        <div className="my-20">
          <div className="flex gap-4 justify-center my-4">
            <AudioPlayer
              audioID={story.audioID!}
              storyBody={story.body || ""}
            />
            <Link href="/" className="flex items-center">
              <Button className="bg-pink-800 hover:bg-pink-900">
                Create More Stories
                <Home className="ml-2" size={16} />
              </Button>
            </Link>
            <DownloadPdfButton />
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error in page function:", error);
    return redirect("/");
  }
}

export default page;
