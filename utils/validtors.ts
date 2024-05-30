import { z } from "zod";
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const userSignupSchema = z.object({
  name: z
    .string({ message: "Username is required." })
    .min(3, "Username must be at least 3 characters long.")
    .max(255, "Username must be at most 255 characters long.")
    .trim(),
  password: z
    .string({ message: "Password is required." })
    .min(8, "Password must be at least 8 characters long.")
    .max(255, "Password must be at most 255 characters long.")
    .trim(),
  email: z.string({ message: "Email is required." }).email("Please enter a valid email address.").toLowerCase().trim(),
});

export const userSigninSchema = userSignupSchema.omit({ name: true });

export const imageUploadSchema = z
  .any()
  .refine((file: File): file is File => !!file && file instanceof File, { message: "Please select a valid image file." })
  .refine((file: File): file is File => ACCEPTED_IMAGE_TYPES.includes(file.type), { message: "Please select a valid image file." })
  .refine((file: File): file is File => file.size < 5 * 1024 * 1024, { message: "Image must be smaller than 5MB." });
