"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SignUp } from "../page";

export default function SignupPage(){
   const [openModal, setOpenModal] = useState(true);
   
     return (
       <>
         <Dialog open={openModal} onOpenChange={setOpenModal}>
           <DialogContent>
             <DialogTitle className="text-xl font-bold mb-2 text-center">SignUp</DialogTitle>
             <SignUp />
           </DialogContent>
         </Dialog>
       </>
     );
   }
   