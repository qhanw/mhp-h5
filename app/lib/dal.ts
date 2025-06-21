"use server";
import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";
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

  if (!session?.userId) {
    redirect("/signin");
  }

  return { isAuth: true, userId: session.userId as string };
});

const getCachedUser = unstable_cache(
  async (userId: string) => {
    try {
      const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, userId),
        // Explicitly return the columns you need rather than the whole user object
        columns: { id: true, username: true, email: true },
        with: { avatar: { columns: { avatar: true } } },
      });

      return { ...user, avatar: user?.avatar.avatar as unknown as string };
    } catch (e) {
      console.log("Failed to fetch user", e);
      return null;
    }
  },
  [],
  { tags: ["login-user"], revalidate: 3600 }
);

export const getUser = cache(async () => {
  const session = await getSession();
  if (!session) return null;
  return await getCachedUser(session.userId as string);
});
