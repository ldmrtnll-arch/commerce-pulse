"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function getVisiblePages(currentPage: number, totalPages: number): Array<number | "ellipsis-start" | "ellipsis-end"> {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, index) => index + 1);
  const pages: Array<number | "ellipsis-start" | "ellipsis-end"> = [1];
  if (currentPage > 3) pages.push("ellipsis-start");
  for (let page = Math.max(2, currentPage - 1); page <= Math.min(totalPages - 1, currentPage + 1); page += 1) pages.push(page);
  if (currentPage < totalPages - 2) pages.push("ellipsis-end");
  pages.push(totalPages);
  return pages;
}

interface OrdersPaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function OrdersPagination({ page, pageSize, totalItems, totalPages, onPageChange }: OrdersPaginationProps) {
  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-4 rounded-card border border-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">Showing <span className="font-medium text-slate-700">{startItem}–{endItem}</span> of <span className="font-medium text-slate-700">{totalItems}</span> orders</p>
      <nav aria-label="Orders pagination" className="flex items-center justify-between gap-1 sm:justify-end">
        <Button type="button" variant="ghost" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="px-2 sm:px-3">
          <ChevronLeft aria-hidden="true" className="size-4" /> <span className="hidden sm:inline">Previous</span>
        </Button>
        <div className="flex items-center gap-1">
          {getVisiblePages(page, totalPages).map((item) => typeof item === "number" ? (
            <button
              key={item}
              type="button"
              aria-label={`Page ${item}`}
              aria-current={item === page ? "page" : undefined}
              onClick={() => onPageChange(item)}
              className={`inline-flex size-8 items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${item === page ? "bg-primary text-white" : "text-slate-600 hover:bg-muted"}`}
            >{item}</button>
          ) : <span key={item} aria-hidden="true" className="px-1 text-muted-foreground">…</span>)}
        </div>
        <Button type="button" variant="ghost" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} className="px-2 sm:px-3">
          <span className="hidden sm:inline">Next</span> <ChevronRight aria-hidden="true" className="size-4" />
        </Button>
      </nav>
    </div>
  );
}
