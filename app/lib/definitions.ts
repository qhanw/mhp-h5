import { z } from "zod";

const BaseAuthSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const SignupFormSchema = BaseAuthSchema.extend({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  confirmPassword: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .trim(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const SigninFormSchema = BaseAuthSchema.extend({
  remember: z.boolean().optional(),
});

export type FormState =
  | {
      errors?: { name?: string[]; email?: string[]; password?: string[] };
      message?: string;
    }
  | undefined;

export type SessionPayload = { userId: string; expiresAt: Date };
