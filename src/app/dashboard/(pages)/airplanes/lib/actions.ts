"use server";

import { ActionResult } from "@/app/auth/login/form/actions";
import { uploadImage } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { airplaneSchema } from "./validation";

export async function getAirplaneById(id: string) {
  try {
    const airplane = await prisma.airplane.findUnique({
      where: { id },
    });
    return airplane;
  } catch (error) {
    console.error(error);
    return null;
  }
}

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

export async function updateAirplane(prevState: ActionResult,id: string, formData: FormData): Promise<ActionResult> {
  const existingAirplane = await prisma.airplane.findFirst({
    where: { id },
  });

  if (!existingAirplane) {
    return {
      errorTitle: "Airplane not found",
      errorMessage: "Please try again",
    };
  }


  const image = formData.get("image") as File;

  let airplaneFormSchemaUpdate;

  if(image.size === 0) {
    airplaneFormSchemaUpdate = airplaneSchema.omit({ image: true });
  } else {
    airplaneFormSchemaUpdate = airplaneSchema;
  }
  
  const values = airplaneFormSchemaUpdate.safeParse(Object.fromEntries(formData));  

  if (!values.success) {
    return {
      errorTitle: "Invalid form data",
      errorMessage: values.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  let fileName;

  if(image.size > 0) {
    const upload = await uploadImage(image);
    if (upload instanceof Error) {
      return {
        errorTitle: "Error uploading image",
        errorMessage: upload.message,
      };
    }

    fileName = upload.fileName;
  } else {
    fileName = existingAirplane?.image;
  }

  try {
    await prisma.airplane.update({
      where: { id },
      data: {
        name: values.data.name,
        code: values.data.code,
        image: fileName,
      },
    });
  } catch (error) {
    return {
      errorTitle: "Error updating airplane",
      errorMessage: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }

  revalidatePath("/dashboard/airplanes");
  redirect("/dashboard/airplanes");
}
