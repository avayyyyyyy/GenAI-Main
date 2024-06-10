import { auth } from "@/auth";
import { ArrowRight, ArrowRightToLineIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user?.email) {
    return redirect("/createStory");
  }

  return (
    <main className="flex flex-col justify-center items-center mt-32">
      <div className="bg-gradient-to-br from-primary to-[#394250] text-transparent text-center  bg-clip-text">
        <div className="text-7xl font-light">Spark the love of </div>
        <div className="font-semibold text-7xl mt-2">
          bed time stories with AI
        </div>
      </div>
      <div className="mt-10 w-[40vw] text-center text-lg">
        Create magical moments with your child by making magical bed time
        stories about them, their toys and their characters.
      </div>
      <Link
        href={"/createStory"}
        className="mt-20 px-3 py-1 border border-primary bg-primary text-primary-foreground flex items-center rounded-full hover:shadow-xl duration-150"
      >
        Create a story <ArrowRight size={16} className="ml-1" />
      </Link>
    </main>
  );
}
