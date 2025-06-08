"use client"
import { LoginForm } from "@/components/login-form";
import { useState } from "react";
import ResetRequest from "../passwordReset/resetRequest/page";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function LoginPage({ open, onOpenChange, setModalType}) {

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle className="text-xl font-bold mb-2 text-center">Login</DialogTitle>
          <LoginForm setModalType={setModalType}/>
        </DialogContent>
      </Dialog>
    </>
  );
}

