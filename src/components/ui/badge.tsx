import type { ComponentProps } from "react";

export function Badge({ className = "", ...props }: ComponentProps<"span">) {
  return <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${className}`} {...props} />;
}
