import { auth } from "@/auth";
import { CreateStoryForm } from "@/components/create-story-form";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await auth();

  if (!session?.user?.email) {
    return redirect("/");
  }

  return (
    <div>
      <div className="text-center font-semibold text-5xl mb-5">
        Create your story!
      </div>
      <hr className="my-4" />
      <CreateStoryForm />
    </div>
  );
}

export default page;
