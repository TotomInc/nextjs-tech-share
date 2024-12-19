"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/db";
import { signSession } from "@/lib/session";

export type SignupState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
};

const createSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(64, "Name must be at most 64 characters"),
  email: z.string().email("Email is not valid"),
  password: z.string().min(8, "Password must be at least 8 characters").max(64, "Password must be at most 64 characters"),
});

export async function signup(name: string, email: string, password: string) {
  const fields = createSchema.safeParse({ name, email, password });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: fields.data.email },
  });

  if (existingUser) {
    return {
      errors: { email: ["Email already in use"] },
    };
  }

  const hashedPassword = await bcrypt.hash(fields.data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: fields.data.name,
      email: fields.data.email,
      password: hashedPassword,
    },
  });

  await signSession(cookies, { userId: user.id, email: fields.data.email })

  redirect("/dashboard");
}
