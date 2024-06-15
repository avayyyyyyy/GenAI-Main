import { signOut } from "@/utils/auth";
import { Button } from "./ui/button";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button className="bg-pink-800 hover:bg-pink-900" type="submit">
        SignOut
      </Button>
    </form>
  );
}
