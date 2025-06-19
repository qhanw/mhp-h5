import { z } from "zod";

export const ProfileSchema = z.object({
  id: z.string().uuid(),
  avatar: z.string().trim().optional(),
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim()
    .optional(),
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .trim()
    .optional(),
  phoneNumber: z.string().trim().optional(),

  gender: z.string().optional(),
  birthday: z
    .string()
    .refine((val) => !isNaN(new Date(val).getTime()))
    .optional(),
  country: z.string().trim().optional(),
  bio: z.string().trim().optional(),
});

export type FormState =
  | { errors?: { id?: string[] }; message?: string }
  | undefined;
