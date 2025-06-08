"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SignUp } from "../page";

export default function SignupPage({ open, onOpenChange,setModalType}){
   
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
   