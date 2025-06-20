"use server";
import { revalidateTag } from "next/cache";
import { cache } from "react";
import { z } from "zod";
import { db, profiles, users, avatars } from "@/db";

import { verifySession } from "@/app/lib/dal";

import { FormState, ProfileSchema, AvatarSchema } from "./definitions";
import { sql, eq } from "drizzle-orm";

/** 用户信息 */
export const getUserinfo = cache(async () => {
  const { userId } = await verifySession();

  try {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId),
      columns: { id: true, username: true, email: true },
      with: {
        profile: {
          columns: {
            id: false,
            nickname: false,
            userId: false,
            updatedAt: false,
            // createdAt: false,
          },
        },
        avatar: { columns: { avatar: true } },
      },
    });

    if (!user) throw new Error("未查询到用户信息");
    const { profile, avatar, ...rest } = user;
    // 只返回查询出来的有值的数据
    return Object.entries({ ...rest, ...profile, ...avatar }).reduce(
      (prev, [k, v]) => (v ? { ...prev, [k]: v } : prev),
      {}
    );
  } catch (e) {
    console.log("Failed to fetch user", e);
    return null;
  }
});

type Payload = z.infer<typeof ProfileSchema>;
export async function update(state: FormState, payload: Payload) {
  // 1. Validate form fields
  const validateFields = ProfileSchema.safeParse({
    id: payload.id,
    avatar: payload.avatar,
    username: payload.username,
    email: payload.email,
    phoneNumber: payload.phoneNumber,
    gender: payload.gender,
    birthday: payload.birthday,
    country: payload.country,
    bio: payload.bio,
  });

  if (!validateFields.success) {
    console.log(validateFields.error.flatten().fieldErrors);
    return { errors: validateFields.error.flatten().fieldErrors };
  }

  const {
    id,
    username,
    email,
    avatar,
    phoneNumber,
    gender,
    birthday,
    country,
    bio,
  } = validateFields.data;

  // TODO: 极致性能先对比数据是否发生更新
  const user = await db
    .update(users)
    .set({
      username,
      email,
      updatedAt: sql`NOW()`,
    })
    .where(eq(users.id, id))
    .returning({ id: users.id });

  const info = {
    avatar,
    phoneNumber,
    gender,
    country,
    bio,
    birthday,
    updatedAt: sql`NOW()`,
  };

  // 插入数据如果存在则更新数据
  const profile = await db
    .insert(profiles)
    .values({ userId: id, ...info })
    .onConflictDoUpdate({ target: profiles.userId, set: info })
    .returning({ id: profiles.id });

  const bool = user?.[0] || profile?.[0];

  if (!bool) {
    return { message: "An error occurred while updating your userinfo." };
  }

  revalidateTag("login-user");
}

export async function changeAvatar(state: FormState, formData: FormData) {
  const { userId } = await verifySession();

  const validateFields = AvatarSchema.safeParse({
    avatar: formData.get("avatar"),
    description: formData.get("filename") || "",
  });

  if (!validateFields.success) {
    console.log(validateFields.error.flatten().fieldErrors);
    return { errors: validateFields.error.flatten().fieldErrors };
  }

  const { avatar, description } = validateFields.data;

  const buffer = await avatar.arrayBuffer();
  const uint8Array = Buffer.from(buffer);

  const d = { description, avatar: uint8Array };

  const res = await db
    .insert(avatars)
    .values({ userId, ...d })
    .onConflictDoUpdate({ target: avatars.userId, set: d })
    .returning({ id: avatars.id });

  if (!res) {
    return { message: "An error occurred while updating your picture." };
  }

  revalidateTag("login-user");
}
