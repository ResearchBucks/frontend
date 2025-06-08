import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function ResetRequest({ onClose }: { onClose: () => void }) {
  return (
    <Dialog open onOpenChange={onClose}>
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
