"use client"
import { LoginForm } from "@/components/login-form";
import { useState } from "react";
import ResetRequest from "../passwordReset/resetRequest/page";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function LoginPage() {
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogTitle className="text-xl font-bold mb-2 text-center">Login</DialogTitle>
          <LoginForm/>
        </DialogContent>
      </Dialog>
    </>
  );
}

