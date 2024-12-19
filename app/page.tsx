import { ButtonLink } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { Pricing } from "@/components/Pricing";

export const dynamic = "force-dynamic";

export default async function Home() {
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

        <Pricing className="mt-24" />
      </section>

      <footer className="flex items-center h-16 bg-zinc-950">
        <div className="container mx-auto px-4">
          <p className="font-medium text-sm text-white/60">&copy; {new Date().getFullYear()} InvoiceTracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
