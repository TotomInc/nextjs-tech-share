"use client";

import { twMerge } from "tailwind-merge";

import { Label } from "@/components/Label";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  forwardedRef?: React.ForwardedRef<HTMLInputElement>;
  icon?: React.ReactNode;
  label?: string;
  containerClassName?: string;
  errorMessage?: string;
};

export type InputProps = Props;

export function Input({
  forwardedRef,
  icon,
  label,
  containerClassName,
  errorMessage,
  ...props
}: Props) {
  const isReadOnly = props.readOnly || props.disabled;

  return (
    <div className={twMerge("flex w-full flex-col", containerClassName)}>
      {label ? (
        <Label id={props.id} className="mb-1">
          {label}
        </Label>
      ) : null}

      <div className="relative">
        {icon ? (
          <div className="absolute left-3 top-3 flex size-4 items-center overflow-hidden text-tertiary">
            {icon}
          </div>
        ) : null}

        <input
          {...props}
          ref={forwardedRef}
          className={twMerge(
            "h-[38px] w-full rounded-lg border border-default bg-white text-sm text-primary placeholder-zinc-600 outline-none autofill:bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-offset-0 disabled:bg-muted",
            icon ? "pl-9" : "px-3",
            props.className,
          )}
          disabled={isReadOnly}
        />
      </div>

      {errorMessage ? <p aria-live="polite" className="text-red-700 text-sm font-medium mt-1">{errorMessage}</p> : null}
    </div>
  );
}
