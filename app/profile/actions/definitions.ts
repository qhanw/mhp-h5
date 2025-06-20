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

export const AvatarSchema = z.object({
  avatar: z
    .instanceof(Blob)
    .refine((file) => file.size <= 0.5 * 1024 * 1024, {
      message: "图片大小必须小于500KB",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      { message: "只支持 .jpg, .png 或 .webp 格式" }
    ),
  description: z.string().optional(),
});

export type FormState =
  | { errors?: { id?: string[]; avatar?: string[] }; message?: string }
  | undefined;
