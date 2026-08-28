"use client";

import {
  ChartNoAxesCombined,
  LayoutDashboard,
  Megaphone,
  Package,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const primaryNavigation = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "Orders", href: "/orders", icon: ShoppingBag },
  { label: "Products", href: "/products", icon: Package },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Analytics", href: "/analytics", icon: ChartNoAxesCombined },
  { label: "Campaigns", href: "/campaigns", icon: Megaphone },
] as const;

function NavigationLink({
  href,
  label,
  icon: Icon,
}: (typeof primaryNavigation)[number] | { href: string; label: string; icon: typeof Settings }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        isActive
          ? "bg-indigo-50 text-indigo-700"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
      }`}
    >
      <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
      {label}
    </Link>
  );
}

export function NavLinks() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <nav aria-label="Primary navigation" className="space-y-1">
        {primaryNavigation.map((item) => <NavigationLink key={item.href} {...item} />)}
      </nav>
      <nav aria-label="Settings navigation" className="mt-auto border-t border-border pt-4">
        <NavigationLink href="/settings" label="Settings" icon={Settings} />
      </nav>
    </div>
  );
}
