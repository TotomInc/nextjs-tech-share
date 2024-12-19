import { twMerge } from "tailwind-merge";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

import { prisma } from "@/lib/db";
import { ButtonLink } from "@/components/Button";

type Props = {
  className?: string;
}

export async function Pricing({ className }: Props) {
  const pricingPlans = await prisma.pricingPlan.findMany({ orderBy: { price: "asc" } });

  return (
    <div className={twMerge("grid grid-cols-1 sm:grid-cols-2 w-full items-stretch gap-4", className)}>
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
  );
}
