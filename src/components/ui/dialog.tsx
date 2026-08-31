"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({ className = "", children, ...props }: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-950/40 data-[state=open]:animate-in" />
      <DialogPrimitive.Content className={`fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-card border border-border bg-card p-6 shadow-xl focus:outline-none ${className}`} {...props}>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogTitle({ className = "", ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title className={`text-lg font-semibold text-foreground ${className}`} {...props} />;
}

export function DialogDescription({ className = "", ...props }: ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description className={`mt-2 text-sm leading-6 text-muted-foreground ${className}`} {...props} />;
}
