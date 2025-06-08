"use client"
import { LoginForm } from "@/components/login-form";
import { useState } from "react";
import ResetRequest from "../passwordReset/resetRequest/page";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface LoginPageProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setModalType: (type: "login" | "signup" | "reset" | null) => void;
  setUserLoginType: (type: string) => void;
}

export default function LoginPage({ open, onOpenChange, setModalType, setUserLoginType}:LoginPageProps) {

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle className="text-xl font-bold mb-2 text-center">Login</DialogTitle>
          <LoginForm setModalType={setModalType} onClose={()=>onOpenChange(false)} setUserLoginType={setUserLoginType}/>
        </DialogContent>
      </Dialog>
    </>
  );
}

