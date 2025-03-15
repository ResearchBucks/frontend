import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { IUser } from "@/types/user/users";
import DeleteConfirmDialogConent from "@/components/dialog/user/delete-confirm";
import UserFormDialog from "@/components/dialog/user/user-form-dialog";

interface ActionsDropDownProps {
  user: IUser;
}

export default function ActionsDropDown({ user }: ActionsDropDownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col gap-1">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setIsUpdateOpen(true);
                setIsDropdownOpen(false);
              }}
            >
              Update User
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer hover:!text-destructive"
              onClick={() => {
                setIsDeleteConfirmOpen(true);
                setIsDropdownOpen(false);
              }}
            >
              Remove
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <UserFormDialog setOpen={() => setIsUpdateOpen(false)} user={user} />
      </Dialog>

      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DeleteConfirmDialogConent
          user={user}
          onSuccess={() => setIsDeleteConfirmOpen(false)}
        />
      </Dialog>
    </>
  );
}
