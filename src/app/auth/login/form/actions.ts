"use server";

import { lucia } from "@/lib/auth";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "../../../../../lib/prisma";
import { validate } from "./validation";

export interface ActionResult {
  errorTitle?: string;
  errorMessage?: string;
}

export async function login(prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const email = formData.get("email");
  const password = formData.get("password");

  const values = validate({
    email: email as string,
    password: password as string,
  });

  if (!values.success) {
    return {
      errorTitle: "Invalid credentials",
      errorMessage: values.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: values.data.email,
    },
  });

  if (!existingUser) {
    return {
      errorTitle: "User not found",
      errorMessage: "User not found",
    };
  }

  const passwordsMatch = await bcrypt.compare(values.data.password, existingUser.password);

  if (!passwordsMatch) {
    return {
      errorTitle: "Invalid credentials",
      errorMessage: "Invalid credentials",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});

  const sessionCookie = lucia.createSessionCookie(session.id);

  (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect("/dashboard");
}
