import { signIn } from "@/utils/auth";
import { Button } from "./ui/button";
import { Github } from "lucide-react";

export function SignIn() {
  return (
    <div className="flex items-center gap-3">
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
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
