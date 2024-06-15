import { ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "@/utils/auth";

const GetStarted = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button
        className="bg-pink-800 hover:bg-pink-900 mt-10 rounded-full"
        type="submit"
      >
        Create a story <ArrowRight size={16} className="ml-1" />
      </Button>
    </form>
  );
};

export default GetStarted;
