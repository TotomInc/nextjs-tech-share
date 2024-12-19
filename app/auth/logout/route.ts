import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { destroySession } from "@/lib/session";

export async function GET() {
  await destroySession(cookies);
  redirect("/");
}