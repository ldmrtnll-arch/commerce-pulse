import type { AcquisitionChannel, CustomerSegment } from "@/types/customer";

export const customerSegmentLabels: Record<CustomerSegment, string> = {
  new: "New",
  returning: "Returning",
  loyal: "Loyal",
  at_risk: "At risk",
};

export const acquisitionChannelLabels: Record<AcquisitionChannel, string> = {
  organic_search: "Organic Search",
  paid_search: "Paid Search",
  social: "Social",
  direct: "Direct",
  referral: "Referral",
  email: "Email",
};

export function getCustomerInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return `${parts[0][0]}${parts.length > 1 ? parts.at(-1)?.[0] ?? "" : ""}`.toUpperCase();
}
