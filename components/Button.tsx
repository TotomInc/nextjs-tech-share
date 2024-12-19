import * as React from "react";
import { twMerge } from "tailwind-merge";
import Link, { type LinkProps } from "next/link";

type Variant = "primary" | "outline" | "destructive";

type ButtonProps = {
  variant?: Variant;
};

type ButtonLinkProps = LinkProps & {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
>(
  ({ children, variant = "primary", ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      type={props.type === "submit" ? "submit" : "button"}
      className={twMerge(
        "flex shrink-0 items-center justify-center gap-1.5 px-3.5 py-2 text-sm rounded-lg font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1",
        variant === "primary" &&
          "bg-zinc-950 text-white hover:bg-zinc-800 focus:bg-zinc-800 focus:ring-zinc-300 disabled:bg-zinc-600",
        variant === "outline" &&
          "border border-default bg-white text-primary hover:bg-zinc-100/80 focus:ring-zinc-300",
        variant === "destructive" &&
          "bg-red-700 text-white hover:bg-red-600 focus:bg-red-600 focus:ring-red-300 disabled:bg-red-600",
        props.className,
      )}
    >
      {children}
    </button>
  ),
);

export const ButtonLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & ButtonLinkProps
>(({ children, variant = "primary", ...props }, ref) => (
  <Link
    {...props}
    ref={ref}
    className={twMerge(
      "flex shrink-0 items-center justify-center gap-1.5 px-4 py-2.5 text-sm rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-1",
      variant === "primary" &&
        "bg-zinc-950 text-white hover:bg-zinc-800 focus:bg-zinc-800 focus:ring-zinc-500 disabled:bg-zinc-600",
      variant === "outline" &&
        "border border-default bg-white text-primary hover:bg-zinc-100/80 focus:ring-zinc-500",
      props.className,
    )}
    prefetch={false}
  >
    {children}
  </Link>
));
