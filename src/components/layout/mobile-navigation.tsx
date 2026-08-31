"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Brand } from "./brand";
import { NavLinks } from "./nav-links";
import { StoreProfile } from "./store-profile";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open navigation menu"
          className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card text-slate-700 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
        >
          <Menu aria-hidden="true" className="size-5" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-[2px] data-[state=closed]:animate-none" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-[min(20rem,88vw)] flex-col border-r border-border bg-card p-5 shadow-xl focus:outline-none">
          <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>
          <div className="flex items-center justify-between">
            <Brand />
            <Dialog.Close
              aria-label="Close navigation menu"
              className="inline-flex size-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X aria-hidden="true" className="size-5" />
            </Dialog.Close>
          </div>
          <div className="mt-8 flex min-h-0 flex-1 flex-col">
            <NavLinks onNavigate={() => setOpen(false)} />
            <StoreProfile />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
