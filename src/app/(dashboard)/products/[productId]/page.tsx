import type { Metadata } from "next";
import { ProductDetails } from "@/features/products/components/product-details";
import { getSafeReturnUrl } from "@/lib/safe-return-url";

export const metadata: Metadata = { title: "Product details" };

export default async function ProductDetailsPage({ params, searchParams }: { params: Promise<{ productId: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [{ productId }, query] = await Promise.all([params, searchParams]);
  return <ProductDetails productId={productId} returnTo={getSafeReturnUrl(query.returnTo, "/products")} />;
}
