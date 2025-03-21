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

export async function updateFlight(prevState: unknown, id: string, formData: FormData): Promise<ActionResult> {
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

  await prisma.flight.update({
    where: { id },
    data: {
      ...validatedFields.data,
      price: Number(validatedFields.data.price),
    },
  });

  revalidatePath("/dashboard/flights");
  redirect("/dashboard/flights");
}

export async function deleteFlight(id: string): Promise<ActionResult> {
  try {
    await prisma.flightSeat.deleteMany({
      where: { flightId: id },
    });
    
    await prisma.flight.delete({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    return {
      errorTitle: "Failed to delete flight",
      errorMessage: "Failed to delete flight",
    };
  }

  revalidatePath("/dashboard/flights");
  redirect("/dashboard/flights");
}
