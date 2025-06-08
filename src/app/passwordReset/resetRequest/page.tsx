"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function ResetRequest() {
  const [open, setOpen] = useState(true); 

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Reset Email</DialogTitle>
        <p className="text-sm text-gray-600 mb-4">Please enter your email to receive reset instructions.</p>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={() => setOpen(false)}
          className="bg-main text-white px-4 py-2 rounded hover:bg-opacity-90"
        >
          Send Reset Link
        </button>
      </DialogContent>
    </Dialog>
  );
}
