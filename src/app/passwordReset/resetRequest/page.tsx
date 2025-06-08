"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ForgotPassword from "./forgotPassword";

interface ResetRequestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userLoginType:string;
}

export default function ResetRequest({ open, onOpenChange }: ResetRequestProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="text-xl font-bold mb-2 text-center">
          Reset Password
        </DialogTitle>
        <ForgotPassword userLoginType={userLoginType}/>
      </DialogContent>
    </Dialog>
  );
}