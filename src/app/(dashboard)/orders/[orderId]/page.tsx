import type { Metadata } from "next";
import { OrderDetails } from "@/features/orders/components/order-details";
import { getSafeReturnUrl } from "@/lib/safe-return-url";

export const metadata: Metadata = { title: "Order details" };

export default async function OrderDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ orderId }, query] = await Promise.all([params, searchParams]);
  return <OrderDetails orderId={orderId} returnTo={getSafeReturnUrl(query.returnTo, "/orders", ["/orders", "/customers"])} />;
}
