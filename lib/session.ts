import "server-only";

import type { cookies as requestCookies } from "next/headers";
import { getIronSession } from "iron-session";

export type Session = {
  isLoggedIn: boolean;
  email: string;
  userId: string;
};

type SignSessionPayload = Omit<Session, "isLoggedIn">;

export async function decryptSession(cookies: typeof requestCookies) {
  const cookiesStore = await cookies();

  const session = await getIronSession<Session>(cookiesStore, {
    cookieName: process.env.SESSION_NAME as string,
    password: process.env.SESSION_SECRET as string,
    ttl: 60 * 60 * 24, // 1 day in seconds
  });

  return session;
}

export async function signSession(
  cookies: typeof requestCookies,
  data: SignSessionPayload,
) {
  const session = await decryptSession(cookies);

  session.isLoggedIn = true;
  session.email = data.email;
  session.userId = data.userId;

  await session.save();

  return session;
}

export async function destroySession(cookies: typeof requestCookies) {
  const session = await decryptSession(cookies);

  session.destroy();
}
