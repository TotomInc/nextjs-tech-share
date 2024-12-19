import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white">
      <Image src="/_static/images/gradient.png" alt="" fill sizes="100vw" className="object-cover pointer-events-none" />

      <div className="relative flex flex-col w-full max-w-md mx-auto p-8 rounded-xl border border-default bg-white shadow-2xl shadow-zinc-950/20">
        {children}
      </div>
    </div>
  );
}