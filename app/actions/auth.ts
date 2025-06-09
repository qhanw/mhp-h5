"use server";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { SignupFormSchema, FormState } from "@/app/lib/definitions";
import { createSession, deleteSession } from "@/app/lib/session";

import { db, users } from "@/db";

export async function signup(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const validateFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
  // 2. Prepare data for insertion into database
  const { name, email, password } = validateFields.data;
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database or call an Auth Library's API
  const data = await db
    .insert(users)
    .values({ username: name, email, password: hashedPassword })
    .returning({ id: users.id })
    .catch((e) => console.log(e));

  const user = data?.[0];

  if (!user) {
    return { message: "An error occurred while creating your account." };
  }
  // TODO:
  // 4. Create user session
  await createSession("userid");
  // 5. Redirect user
  redirect("/profile");
}

export async function signin(state: FormState, formData: FormData) {
  console.log(formData);
  // 1. Validate form fields
  const validateFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }
  // 2. Prepare data for insertion into database
  // const { name, email, password } = validateFields.data;
  // // e.g. Hash the user's password before storing it
  // const hashedPassword = await bcrypt.hash(password, 10);

  // // 3. Insert the user into the database or call an Auth Library's API
  // const data = await db
  //   .insert(users)
  //   .values({
  //     name,
  //     email,
  //     password: hashedPassword,
  //   })
  //   .returning({ id: users.id });

  // const user = data[0];

  // if (!user) {
  //   return {
  //     message: "An error occurred while creating your account.",
  //   };
  // }

  // TODO:
  // 4. Create user session
  await createSession("userid");
  // 5. Redirect user
  redirect("/profile");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
