import Link from "next/link";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh p-8">
      <div className="relative flex flex-col w-full max-w-5xl mx-auto rounded-xl border border-default shadow-2xl shadow-zinc-950/10 bg-white p-6 gap-6">
        {children}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full flex items-center justify-center px-4 py-3 border border-default shadow-2xl bg-white">
        <Link
          href="/auth/logout"
          prefetch={false}
          className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:underline"
        >
          Logout <ArrowRightStartOnRectangleIcon className="size-4" />
        </Link>
      </div>
    </main>
  )
}