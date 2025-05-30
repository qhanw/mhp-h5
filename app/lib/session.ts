import "server-only";
import { cookies } from "next/headers";

import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "@/app/lib/definitions";

const { NODE_ENV, SESSION_SECRET } = process.env;

const encodedKey = new TextEncoder().encode(SESSION_SECRET);

type SetCookieArgs = Parameters<Awaited<ReturnType<typeof cookies>>["set"]>;

const cookieOpts = (expires: Date) =>
  ({
    httpOnly: true,
    secure: NODE_ENV !== "development", // 启用 https 时调整为 true 否则 cookie 会丢失
    expires,
    sameSite: "lax",
    path: "/",
  } as SetCookieArgs[2]);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    console.log("Failed to verify session");
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, cookieOpts(expiresAt));
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set("session", session, cookieOpts(expires));
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
