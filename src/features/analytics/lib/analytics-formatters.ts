export function formatMetricChange(value: number | null): string {
  if (value === null) return "No previous data";
  if (value === 0) return "No change";
  const formatted = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(Math.abs(value));
  return `${value > 0 ? "+" : "−"}${formatted}%`;
}
