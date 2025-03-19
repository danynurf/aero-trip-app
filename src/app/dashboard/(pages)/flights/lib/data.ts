"use server";

import prisma from "@/lib/prisma";
import type { Flight } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getFlights(): Promise<Flight[]> {
    try {
        const flights = await prisma.flight.findMany({
            include: {
                airplane: true,
                flightSeats: true,
            },
        });
        return flights;
    } catch (error) {
        console.error(error);
        return []
    }
}

export async function getFlightById(id: string) {
  const flight = await prisma.flight.findUnique({
    where: { id },
  });
  return flight;
}

export async function createFlight(flight: Flight) {
  const newFlight = await prisma.flight.create({
    data: flight,
  });
  revalidatePath("/dashboard/flights");
  redirect("/dashboard/flights");
}

export async function updateFlight(id: string, flight: Flight) {
  const updatedFlight = await prisma.flight.update({
    where: { id },
    data: flight,
  });
}