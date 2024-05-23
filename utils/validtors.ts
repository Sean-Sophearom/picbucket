import { z } from "zod";

// Todo: Better error messages for required fields

export const userSignupSchema = z.object({
  name: z
    .string({ message: "Username is required." })
    .min(3, "Username must be at least 3 characters long.")
    .max(255, "Username must be at most 255 characters long."),
  password: z
    .string({ message: "Password is required." })
    .min(8, "Password must be at least 8 characters long.")
    .max(255, "Password must be at most 255 characters long."),
  email: z.string({ message: "Email is required." }).email("Please enter a valid email address.").toLowerCase(),
});

export const userSigninSchema = userSignupSchema.omit({ name: true });
