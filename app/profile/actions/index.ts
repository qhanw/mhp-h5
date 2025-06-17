"use server";
import { cache } from "react";
import { db } from "@/db";

import { verifySession } from "@/app/lib/dal";

import { FormState, ProfileSchema } from "./definitions";

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
            createdAt: false,
          },
        },
      },
    });

    if (!user) throw new Error("未查询到用户信息");
    const { profile, ...rest } = user;
    return { ...rest, ...profile };
  } catch (e) {
    console.log("Failed to fetch user", e);
    return null;
  }
});

export async function update(state: FormState, formData: FormData) {
  console.log(...formData);

  // 1. Validate form fields
  const validateFields = ProfileSchema.safeParse({
    id: formData.get("id"),
    avatar: formData.get("avatar"),
    username: formData.get("username"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    gender: formData.get("gender"),
    birthday: formData.get("birthday"),
    country: formData.get("country"),
    bio: formData.get("bio"),
  });

  if (!validateFields.success) {
    console.log(validateFields.error.flatten().fieldErrors);
    return { errors: validateFields.error.flatten().fieldErrors };
  }

  //   // 3. Insert the user into the database or call an Auth Library's API
  //   const data = await db
  //     .insert(users)
  //     .values({ username: name, email, password: hashedPassword })
  //     .returning({ id: users.id })
  //     .catch((e) => console.log(e));

  //   const user = data?.[0];

  //   if (!user) {
  //     return { message: "An error occurred while creating your account." };
  //   }
}
