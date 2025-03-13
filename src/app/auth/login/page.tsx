import { Metadata } from "next";
import AuthForm from "./form";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};


export default async function LoginPage() {
  const { session, user } = await getUser();

  if (session && user?.role == "ADMIN") {
    redirect("/dashboard");
  }
  return <AuthForm />;
}
