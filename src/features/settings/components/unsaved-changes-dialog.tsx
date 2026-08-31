"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export function UnsavedChangesDialog({ open, onOpenChange, onDiscard }: { open: boolean; onOpenChange: (open: boolean) => void; onDiscard: () => void }) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent><DialogTitle>Discard unsaved changes?</DialogTitle><DialogDescription>You have unsaved changes in this section. Discard them and continue?</DialogDescription><div className="mt-6 flex justify-end gap-3"><DialogClose asChild><Button>Keep editing</Button></DialogClose><Button variant="primary" onClick={onDiscard}>Discard changes</Button></div></DialogContent></Dialog>;
}
