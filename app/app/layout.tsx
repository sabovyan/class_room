import { auth } from "@/auth";
import { Header } from "./components/Header";
import { MyAccount } from "./components/MyAccount";
import { redirect } from "next/navigation";

export default async function SpacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <>
      <Header>
        <MyAccount />
      </Header>
      {children}
    </>
  );
}
