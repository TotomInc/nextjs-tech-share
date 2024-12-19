"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/db";
import { signSession } from "@/lib/session";

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
    globalError?: string;
  };
};

const loginSchema = z.object({
  email: z.string().email("Email is not valid"),
  password: z.string().min(8, "Password must be at least 8 characters").max(64, "Password must be at most 64 characters"),
});

export async function login(email: string, password: string) {
  const fields = loginSchema.safeParse({ email, password });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: fields.data.email },
  });

  if (!user) {
    return {
      errors: { globalError: "Invalid email or password" },
    };
  }

  const passwordMatch = await bcrypt.compare(fields.data.password, user.password);

  if (!passwordMatch) {
    return {
      errors: { globalError: "Invalid email or password" },
    };
  }

  await signSession(cookies, { userId: user.id, email: fields.data.email });

  return redirect("/dashboard");
}
