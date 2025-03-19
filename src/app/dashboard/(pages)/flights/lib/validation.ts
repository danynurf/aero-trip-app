import { z } from "zod";

export const validateFlight = z.object({
  airplaneId: z.string({ required_error: "Airplane is required" }).min(1),
  price: z.string({ required_error: "Price is required" }).min(0),
  departureCity: z
    .string({ required_error: "Departure city is required" })
    .min(3, { message: "Departure city must be at least 3 characters" }),
  departureDate: z.date({ required_error: "Departure date is required" }),
  departureCityCode: z
    .string({ required_error: "Departure city code is required" })
    .min(3, { message: "Departure city code must be at least 3 characters" })
    .max(3, { message: "Departure city code must be 3 characters" }),
  destinationCity: z
    .string({ required_error: "Destination city is required" })
    .min(3, { message: "Destination city must be at least 3 characters" }),
  arrivalDate: z.date({ required_error: "Arrival date is required" }),
  destinationCityCode: z
    .string({ required_error: "Destination city code is required" })
    .min(3, { message: "Destination city code must be at least 3 characters" })
    .max(3, { message: "Destination city code must be 3 characters" }),
});
