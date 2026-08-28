import type { Metadata } from "next";
import { OrderDetails } from "@/features/orders/components/order-details";

export const metadata: Metadata = { title: "Order details" };

function getSafeReturnUrl(value: string | string[] | undefined): string {
  const returnUrl = Array.isArray(value) ? value[0] : value;
  return returnUrl?.startsWith("/orders") && !returnUrl.startsWith("//") ? returnUrl : "/orders";
}

export default async function OrderDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ orderId }, query] = await Promise.all([params, searchParams]);
  return <OrderDetails orderId={orderId} returnTo={getSafeReturnUrl(query.returnTo)} />;
}
