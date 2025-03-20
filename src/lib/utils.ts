import { FlightSeat, TypeSeat } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

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

export const dateFormat = (date: Date | string, format: string = "DD MMM YYYY") => {
  if (!date) return "";

  const day = dayjs(date);

  if (!day.isValid()) return "";

  return day.format(format);
};

export const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

export const mappingSeats = (seats: FlightSeat[]) => {
  const economySeats = seats.filter((seat) => seat.type == "ECONOMY");
  const businessSeats = seats.filter((seat) => seat.type == "BUSINESS");
  const firstSeats = seats.filter((seat) => seat.type == "FIRST");

  const economySeatsAvailable = economySeats.filter((seat) => !seat.isBooked).length;
  const businessSeatsAvailable = businessSeats.filter((seat) => !seat.isBooked).length;
  const firstSeatsAvailable = firstSeats.filter((seat) => !seat.isBooked).length;

  return {
    economySeatsAvailable,
    businessSeatsAvailable,
    firstSeatsAvailable,
    economySeatsTotal: economySeats.length,
    businessSeatsTotal: businessSeats.length,
    firstSeatsTotal: firstSeats.length,
  };
};
