import { Metadata } from "next";
import AuthForm from "./form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};


export default function LoginPage() {
  return <AuthForm />;
}
