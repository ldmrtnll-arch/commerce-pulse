import { getCustomerInitials } from "../lib/customer-labels";

const avatarStyles = [
  "bg-indigo-50 text-indigo-700",
  "bg-emerald-50 text-emerald-700",
  "bg-amber-50 text-amber-700",
  "bg-sky-50 text-sky-700",
  "bg-violet-50 text-violet-700",
] as const;

export function CustomerAvatar({ name, customerId, large = false }: { name: string; customerId: string; large?: boolean }) {
  const numericId = Number.parseInt(customerId.replace(/\D/g, ""), 10) || 0;
  return <span aria-hidden="true" className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${avatarStyles[numericId % avatarStyles.length]} ${large ? "size-14 text-base" : "size-10 text-sm"}`}>{getCustomerInitials(name)}</span>;
}
