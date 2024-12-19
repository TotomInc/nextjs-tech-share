import type { Metadata } from "next";

import { verifySession } from "@/lib/auth";
import { CreateInvoiceForm } from "@/components/forms/CreateInvoiceForm";

export const metadata: Metadata = {
  title: 'Create an invoice - InvoiceTracker',
  description: 'Effortlessly manage and track all your invoices in one place with InvoiceTracker.',
}

export const dynamic = "force-dynamic";

export default async function Home() {
  await verifySession();

  return (
    <>
      <h2 className="font-semibold">Create an invoice</h2>

      <CreateInvoiceForm />
    </>
  );
}
