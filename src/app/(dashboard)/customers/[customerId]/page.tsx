import type { Metadata } from "next";
import { CustomerDetails } from "@/features/customers/components/customer-details";
import { getSafeReturnUrl } from "@/lib/safe-return-url";

export const metadata: Metadata = { title: "Customer details" };

export default async function CustomerDetailsPage({ params, searchParams }: { params: Promise<{ customerId: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [{ customerId }, query] = await Promise.all([params, searchParams]);
  return <CustomerDetails customerId={customerId} returnTo={getSafeReturnUrl(query.returnTo, "/customers", ["/customers", "/campaigns"])} />;
}
