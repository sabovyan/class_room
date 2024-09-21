import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Header } from "./components/Header";
import { MyAccount } from "./components/MyAccount";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header>
          <MyAccount />
        </Header>
        {children}
      </body>
    </html>
  );
}
