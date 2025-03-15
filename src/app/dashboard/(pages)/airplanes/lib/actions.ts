"use server";

import { ActionResult } from "@/app/auth/login/form/actions";
import { uploadImage } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "../../../../../../lib/prisma";
import { airplaneSchema } from "./validation";

export async function saveAirplane(prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const values = airplaneSchema.safeParse(Object.fromEntries(formData));

  if (!values.success) {
    return {
      errorTitle: "Invalid form data",
      errorMessage: values.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  const existingAirplane = await prisma.airplane.findFirst({
    where: {
      code: values.data.code,
    },
  });

  if (existingAirplane) {
    return {
      errorTitle: "Airplane already exists",
      errorMessage: "Please use a different code",
    };
  }

  const upload = await uploadImage(values.data.image);
  console.log(upload);
  
  if (upload instanceof Error) {
    return {
      errorTitle: "Error uploading image",
      errorMessage: upload.message,
    };
  }

  try {
    await prisma.airplane.create({
        data: {
            name: values.data.name,
            code: values.data.code,
            image: upload.fileName,
        }
    });
  } catch (error) {
    return {
      errorTitle: "Error creating airplane",
      errorMessage: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }

  revalidatePath("/dashboard/airplanes");
  redirect("/dashboard/airplanes");
}
