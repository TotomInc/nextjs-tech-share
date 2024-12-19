"use server";

import z from "zod";

import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";

export type CreateInvoiceState = {
  errors?: {
    name?: string[];
    amount?: string[];
    customerName?: string[];
    customerEmail?: string[];
    globalError?: string;
  };
};

const createSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(64, "Name must be at most 64 characters"),
  amount: z.coerce.number().min(1, "Amount must be at least 1").max(1_000_000, "Amount must be at most 1,000,000"),
  customerName: z.string().min(3, "Customer name must be at least 1 character").max(64, "Customer name must be at most 64 characters"),
  customerEmail: z.string().email("Email is not valid"),
});

export async function createInvoice(name: string, amount: string, customerName: string, customerEmail: string) {
  const { user } = await verifySession();
  const fields = createSchema.safeParse({ name, amount, customerName, customerEmail });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  await prisma.invoice.create({
    data: {
      userId: user.id,
      name: fields.data.name,
      amount: fields.data.amount,
      customerName: fields.data.customerName,
      customerEmail: fields.data.customerEmail,
    },
  });
}

export async function deleteInvoice(invoiceId: string) {
  const { user } = await verifySession();

  await prisma.invoice.delete({
    where: { id: invoiceId, userId: user.id },
  });
}
