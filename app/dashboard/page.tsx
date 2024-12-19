import type { Metadata } from "next";
import { PlusIcon } from "@heroicons/react/20/solid";

import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { ButtonLink } from "@/components/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table";

export const metadata: Metadata = {
  title: 'Dashboard - InvoiceTracker',
  description: 'Effortlessly manage and track all your invoices in one place with InvoiceTracker.',
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const { user } = await verifySession();

  const invoices = await prisma.invoice.findMany({
    where: { userId: user.id },
  });

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <h1 className="font-semibold">{user.name}, your invoices</h1>

        <ButtonLink href="/dashboard/create-invoice">
          <PlusIcon className="size-5" /> Create an invoice
        </ButtonLink>
      </div>

      {invoices.length === 0 ? (
        <p className="text-sm text-center text-secondary font-medium">
          You don&apos;t have any invoice.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Customer Email</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="max-w-[64px] overflow-hidden text-ellipsis whitespace-nowrap">{invoice.id}</TableCell>
                <TableCell>{invoice.name}</TableCell>
                <TableCell>{invoice.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</TableCell>
                <TableCell>{invoice.customerName}</TableCell>
                <TableCell>{invoice.customerEmail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
