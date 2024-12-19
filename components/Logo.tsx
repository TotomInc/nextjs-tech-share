import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export function Logo({ className }: Props) {
  return (
    <div className={twMerge("flex items-center gap-2.5", className)}>
      <span className="flex items-center justify-center size-8 rounded-md border border-default">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary size-4">
          <g>
            <path d="M7.81815 8.36373L12 0L24 24H15.2809L7.81815 8.36373Z" fill="currentColor"></path>
            <path d="M4.32142 15.3572L8.44635 24H-1.14809e-06L4.32142 15.3572Z" fill="currentColor"></path>
          </g>
        </svg>
      </span>

      <h1 className="text-xl font-bold text-primary tracking-tight">InvoiceTracker</h1>
    </div>
  )
}