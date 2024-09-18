import { Button } from "@/components/ui/button";
import { auth, signIn, signOut } from "@/auth";

export default async function SignIn() {
  const session = await auth();

  if (session) {
    return (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button> Signout</Button>
      </form>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/app" });
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
