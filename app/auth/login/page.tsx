import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: 'Login - InvoiceTracker',
  description: 'Effortlessly manage and track all your invoices in one place with InvoiceTracker.',
}

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <>
      <h2 className="font-semibold text-2xl mb-2 tracking-tight">Log in</h2>

      <p className="text-secondary text-sm font-medium">
        Don&apos;t have an account yet? <Link href="/auth/signup" className="underline">Sign up</Link>
      </p>

      <LoginForm />
    </>
  );
}
