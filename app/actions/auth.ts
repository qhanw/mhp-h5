"use server";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import {
  SignupFormSchema,
  SigninFormSchema,
  FormState,
} from "@/app/lib/definitions";
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

  // 4. Create user session
  await createSession(user.id);
  // 5. Redirect user
  redirect("/profile");
}

export async function signin(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const validateFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    return { errors: validateFields.error.flatten().fieldErrors };
  }

  // 2. Search for user data based on username or email
  const { email, password } = validateFields.data;
  //
  // const data = await db.select().from(users).where(eq(users.email, email));
  const user = await db.query.users
    .findFirst({
      where: (users, { eq }) => eq(users.email, email),
    })
    .catch((e) => console.log(e));

  if (!user) return { message: "Account does not exist." };

  const match = await bcrypt.compare(password, user.password);
  if (!match) return { message: "The password is wrong!" };

  // 4. Create user session
  await createSession(user.id);
  // 5. Redirect user
  redirect("/profile");
}

export async function signout() {
  await deleteSession();
  redirect("/signin");
}
