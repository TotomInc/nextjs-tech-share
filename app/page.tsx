import { CheckCircleIcon } from "@heroicons/react/20/solid";

import { prisma } from "@/lib/db";
import { ButtonLink } from "@/components/Button";
import { Logo } from "@/components/Logo";

export const dynamic = "force-dynamic";

export default async function Home() {
  const pricingPlans = await prisma.pricingPlan.findMany({ orderBy: { price: "asc" } });

  return (
    <div className="relative bg-white">
      <header className="h-16 flex items-center w-full border-b border-default">
        <nav className="container mx-auto flex items-center justify-between w-full px-4">
          <Logo />

          <div className="flex gap-4">
            <ButtonLink variant="outline" className="py-2" href="/auth/login">Login</ButtonLink>
            <ButtonLink variant="primary" className="py-2" href="/auth/signup">Create account</ButtonLink>
          </div>
        </nav>
      </header>

      <section className="min-h-[calc(100vh-4rem-4rem)] flex flex-col items-center max-w-4xl mx-auto px-4 w-full pt-32 pb-16">
        <h1 className="mb-6 text-7xl font-bold tracking-[-2px] text-primary text-center">Simplify your<br />Invoice Tracking</h1>

        <p className="mb-8 text-xl font-medium tracking-tight text-secondary text-center text-balance">
          Effortlessly manage and track all your invoices in one place with InvoiceTracker, the modern invoice management solution.
        </p>

        <ButtonLink variant="primary" href="/auth/signup">Start for free</ButtonLink>

        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 w-full items-stretch gap-4">
          {pricingPlans.map((plan) => (
            <div key={plan.id} className="relative max-w-sm w-full flex flex-col p-8 gap-4 rounded-2xl border border-default shadow-2xl shadow-zinc-950/15 bg-white">
              {plan.popular ? (
                <span className="absolute -top-4 left-4 flex px-4 py-1 rounded-full font-semibold text-sm tracking-tight text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Most popular</span>
              ) : null}

              <h3 className="font-bold text-3xl tracking-tight">{plan.name}</h3>

              <span className="text-4xl font-bold tracking-tighter">
                ${plan.price} <span className="text-lg text-secondary tracking-normal font-medium">/per month</span>
              </span>
              
              <p className="text-secondary font-medium">{plan.description}</p>

              <ul className="flex flex-col gap-2">
                <li className="flex items-center text-secondary gap-1 text-sm font-medium">
                  <CheckCircleIcon className="size-5 text-green-700" /> {plan.maxInvoices} invoices
                </li>

                <li className="flex items-center text-secondary gap-1 text-sm font-medium">
                  <CheckCircleIcon className="size-5 text-green-700" /> Up to {plan.maxUsers} users
                </li>
              </ul>

              <ButtonLink href="/auth/login">Get started</ButtonLink>
            </div>
          ))}
        </div>
      </section>

      <footer className="flex items-center h-16 bg-zinc-950">
        <div className="container mx-auto px-4">
          <p className="font-medium text-sm text-white/60">&copy; {new Date().getFullYear()} InvoiceTracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
