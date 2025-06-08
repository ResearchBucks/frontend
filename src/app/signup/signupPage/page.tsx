"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SignUp } from "../page";

interface SignupPageProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setModalType: (type: "login" | "signup" | null) => void;
}

export default function SignupPage({ open, onOpenChange,setModalType}:SignupPageProps){
   
     return (
       <>
         <Dialog open={open} onOpenChange={onOpenChange}>
           <DialogContent>
             <DialogTitle className="text-xl font-bold mb-2 text-center">SignUp</DialogTitle>
             <SignUp setModalType={setModalType}/>
           </DialogContent>
         </Dialog>
       </>
     );
   }
   