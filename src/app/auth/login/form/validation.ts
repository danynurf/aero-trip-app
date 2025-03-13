import { z } from "zod";

export const formSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, { message: "Password must be at least 8 characters long" }),
});

export type FormSchema = z.infer<typeof formSchema>;

export const validate = (values: FormSchema) => {
  return formSchema.safeParse(values);
};
