import type { Metadata } from "next";
import Link from "next/link";

import { SignupForm } from "@/components/forms/SignupForm";

export const metadata: Metadata = {
  title: 'Sign-up - InvoiceTracker',
  description: 'Effortlessly manage and track all your invoices in one place with InvoiceTracker.',
}

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <>
      <h2 className="font-semibold text-2xl mb-2 tracking-tight">Sign up</h2>

      <p className="text-secondary text-sm font-medium">
        Already have an account? <Link href="/auth/login" className="underline">Log in</Link>
      </p>

      <SignupForm />
    </>
  );
}
