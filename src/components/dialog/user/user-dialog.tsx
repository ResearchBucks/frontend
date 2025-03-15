"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import UserFormDialog from "./user-form-dialog";

export function UserDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <UserFormDialog setOpen={setOpen} />
    </Dialog>
  );
}
