import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { decryptSession } from "@/lib/session";

export async function verifySession() {
  const session = await decryptSession(cookies);

  if (!session.isLoggedIn) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  if (!user || user.email !== session.email) {
    redirect("/auth/logout");
  }

  return { session, user };
}
