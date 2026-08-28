import { Activity } from "lucide-react";
import Link from "next/link";

export function Brand() {
  return (
    <Link
      href="/"
      aria-label="CommercePulse overview"
      className="inline-flex items-center gap-2.5 rounded-md text-[15px] font-semibold tracking-tight text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
        <Activity aria-hidden="true" className="size-[18px]" strokeWidth={2.2} />
      </span>
      CommercePulse
    </Link>
  );
}
