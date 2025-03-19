"use server";

import { ActionResult } from "@/app/auth/login/form/actions";
import { validateFlight } from "./validation";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { generateSeatPerClass } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createFlight(prevState: unknown, formData: FormData): Promise<ActionResult> {
  const validatedFields = validateFlight.safeParse({
    ...Object.fromEntries(formData),
    departureDate: new Date(formData.get("departureDate") as string),
    arrivalDate: new Date(formData.get("arrivalDate") as string),
  });

  if (!validatedFields.success) {
    return {
      errorTitle: "Invalid fields",
      errorMessage: validatedFields.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  const data = await prisma.flight.create({
    data: {
      ...validatedFields.data,
      price: Number(validatedFields.data.price),
    },
  });   

  const seats = await generateSeatPerClass(data.id);

  await prisma.flightSeat.createMany({
    data: seats,
  });

  revalidatePath("/dashboard/flights");
  redirect("/dashboard/flights");
}
