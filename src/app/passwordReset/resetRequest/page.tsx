"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ResetRequestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ResetRequest({ open, onOpenChange }: ResetRequestProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="text-xl font-bold mb-2 text-center">
          Reset Password
        </DialogTitle>
        {/* Your reset password form content here */}
      </DialogContent>
    </Dialog>
  );
}