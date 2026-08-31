import type { ComponentProps } from "react";

export function Card({ className = "", ...props }: ComponentProps<"section">) {
  return (
    <section
      className={`min-w-0 rounded-card border border-border bg-card ${className}`}
      {...props}
    />
  );
}
