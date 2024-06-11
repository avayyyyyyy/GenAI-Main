import React from "react";
import { auth } from "@/utils/auth";
import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

async function Navbar() {
  const session = await auth();

  return (
    <div className="flex justify-between py-4 mb-20  border-b border-primary items-center">
      <div className="flex gap-4 items-center">
        <Link href={"/"} className="text-2xl font-bold">
          <Image
            width={80}
            height={80}
            src={
              "https://utfs.io/f/178d9e01-3c79-4bbc-b458-ba72066d99f6-sv2igw.12.24_PM-removebg-preview.png"
            }
            alt="App Logo"
          />
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
                className="hover:bg-[#dbd0c3] bg-[#FEF2E2] border-primary/30  duration-100"
              >
                {" "}
                Your Stories
              </Button>
            </Link>
            <Link
              href={"/createStory"}
              className="hover:underline font-semibold text-lg"
            >
              <Button>create story</Button>
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
