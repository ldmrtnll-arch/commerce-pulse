import { Badge } from "@/components/ui/badge";
import type { CustomerSegment } from "@/types/customer";
import { customerSegmentLabels } from "../lib/customer-labels";

const styles: Record<CustomerSegment, string> = {
  new: "bg-sky-50 text-sky-700 ring-sky-600/20",
  returning: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  loyal: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  at_risk: "bg-amber-50 text-amber-800 ring-amber-600/20",
};

export function CustomerSegmentBadge({ segment }: { segment: CustomerSegment }) {
  return <Badge className={styles[segment]}>{customerSegmentLabels[segment]}</Badge>;
}
