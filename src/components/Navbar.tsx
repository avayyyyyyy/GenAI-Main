import React from "react";
import { auth } from "@/utils/auth";
import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";
import Link from "next/link";

async function Navbar() {
  const session = await auth();

  return (
    <div className="flex justify-between py-4 mb-20  border-b border-primary items-center">
      <div className="flex gap-4 items-center">
        <Link href={"/"} className="text-2xl font-bold">
          Bed Time
        </Link>
        <Link href={"/manage"} className="hover:underline">
          Manage
        </Link>
        <Link href={"/createStory"} className="hover:underline">
          create story
        </Link>
      </div>
      <div>{session?.user?.email ? <SignOut /> : <SignIn />}</div>
    </div>
  );
}

export default Navbar;
