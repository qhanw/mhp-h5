"use server";
import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";

import { db } from "@/db";

export const getSession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  return await decrypt(cookie);
});

export const verifySession = cache(async () => {
  const session = await getSession();

  console.log("session:", session);

  if (!session?.userId) {
    redirect("/signin");
  }

  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await getSession();
  if (!session) return null;

  try {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, session.userId as string),
      // Explicitly return the columns you need rather than the whole user object
      columns: {
        id: true,
        username: true,
        email: true,
      },
    });
    return user;
  } catch {
    console.log("Failed to fetch user");
    return null;
  }
});
