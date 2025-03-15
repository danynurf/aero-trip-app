"use server";

import { Airplane } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function getAirplanes() {
  try {
    const airplanes = await prisma.airplane.findMany();
    return airplanes;
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}

export async function createAirplane(airplane: Airplane) {
  const newAirplane = await prisma.airplane.create({
    data: airplane,
  });
  return newAirplane;
}

export async function updateAirplane(airplane: Airplane) {
  const updatedAirplane = await prisma.airplane.update({
    where: { id: airplane.id },
    data: airplane,
  });
  return updatedAirplane;
}
