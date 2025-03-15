import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 1024 * 1024 * 2;

export const airplaneSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(4, { message: "Name must be at least 4 characters long" }),
  code: z
    .string({ required_error: "Code is required" })
    .regex(/^[A-Z]{3}-[0-9]{3}$/, { message: "Code must be in the format of ABC-123" }),
  image: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), { message: "Invalid image type" })
    .refine((file) => file.size <= MAX_FILE_SIZE, { message: "Image must be less than 5MB" }),
});

export type Airplane = z.infer<typeof airplaneSchema>;
