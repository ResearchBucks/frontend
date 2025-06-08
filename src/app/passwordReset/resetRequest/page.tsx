import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

export default function ResetRequest() {
    const [open, onOpenChange] = useState(false)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="text-xl font-bold mb-2 text-center">Reset Password</DialogTitle>
        {/* Your reset form content */}
        <form>
          {/* Email input, submit button, etc. */}
        </form>
      </DialogContent>
    </Dialog>
  );
}
