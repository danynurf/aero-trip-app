import { TypeSeat } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function generateSeatPerClass(flightId: string) {
  const SEAT_CLASSES: TypeSeat[] = ["ECONOMY", "BUSINESS", "FIRST"];
  const SEAT_CODE = ["A", "B", "C", "D"];

  const seats: { flightId: string; type: TypeSeat; seatNumber: string }[] = [];

  for (const type of SEAT_CLASSES) {
    for (const code of SEAT_CODE) {
      for (let index = 1; index <= 5; index++) {
        seats.push({
          flightId,
          type,
          seatNumber: code + index,
        });
      }
    }
  }
  
  return seats;
}