import { signIn } from "@/utils/auth";
import { Button } from "./ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

export function SignIn() {
  return (
    <div className="flex items-center gap-3">
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <Button asChild className="bg-pink-800 hover:bg-pink-900 mr-4">
          <Link
            href={"https://github.com/avayyyyyyy/GenAI-Main"}
            target="_blank"
          >
            <div className="flex items-center">
              Star on Github <Github size={18} className="ml-2" />
            </div>
          </Link>
        </Button>
        <Button className="bg-pink-800 hover:bg-pink-900" type="submit">
          SignIn With Github <Github size={16} className="ml-2" />
        </Button>
      </form>
      {/* <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Button className="bg-pink-800 hover:bg-pink-900" type="submit">
          SignIn With Google
        </Button>
      </form> */}
    </div>
  );
}
