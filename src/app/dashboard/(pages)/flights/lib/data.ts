"use server";

import prisma from "@/lib/prisma";
import type { Flight } from "@prisma/client";

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
  try {
    const flight = await prisma.flight.findFirst({
      where: { id },
    });
    return flight;
  } catch (error) {
    console.error(error);
    return null;
  }
}
