import { z } from "zod";

// Todo: Better error messages for required fields

export const userSignupSchema = z.object({
  name: z
    .string({ message: "Name must be a string.", required_error: "Name is required." })
    .min(3, "Username must be at least 3 characters long.")
    .max(255, "Username must be at most 255 characters long."),
  password: z.string().min(8, "Password must be at least 8 characters long.").max(255, "Password must be at most 255 characters long."),
  email: z.string().email(),
});

export const userSigninSchema = userSignupSchema.omit({ name: true });
