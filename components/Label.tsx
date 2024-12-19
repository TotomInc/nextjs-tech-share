import * as React from "react";
import { twMerge } from "tailwind-merge";

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    {...props}
    ref={ref}
    className={twMerge(
      "flex items-center gap-2 text-sm font-medium text-primary",
      className,
    )}
  />
));
