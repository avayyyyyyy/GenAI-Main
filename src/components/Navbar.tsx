import React from "react";
import { auth } from "@/utils/auth";
import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Github } from "lucide-react";

async function Navbar() {
  const session = await auth();

  return (
    <div className="flex justify-between py-4 mb-10  border-b border-pink-800 items-center">
      <div className="flex gap-4 items-center">
        <Link
          href={"/"}
          className="text-2xl flex items-center gap-2  font-bold"
        >
          <Image
            width={60}
            height={60}
            src={
              "https://utfs.io/f/e8f8eeb2-1278-4fa1-ad49-a6ccd8b35a33-164wir.png"
            }
            alt="App Logo"
          />
          <div className="text-pink-900 underline decoration-wavy  text-4xl font-bold">
            StoryDev
          </div>
        </Link>
      </div>
      <div>
        {session?.user?.email ? (
          <div className="flex items-center gap-3">
            <Link
              href={"/manage"}
              className="hover:underline font-semibold text-lg"
            >
              <Button
                variant={"outline"}
                className="hover:bg-pink-300 bg-pink-200 border-primary/30  duration-100"
              >
                {" "}
                Your Stories
              </Button>
            </Link>
            <Link
              href={"/createStory"}
              className="hover:underline font-semibold text-lg"
            >
              <Button className="bg-pink-800 hover:bg-pink-900">
                create story
              </Button>
            </Link>
            <SignOut />
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </div>
  );
}

export default Navbar;
