import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserForm from "@/components/admin/users/user-form";
import { IUser } from "@/types/user/users";

interface UserFormDialogProps {
  setOpen: (value: boolean) => void;
  user?: IUser;
}

export default function UserFormDialog({ setOpen, user }: UserFormDialogProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {user ? `Update User ${user.name}` : "Add User"}
        </DialogTitle>
        <DialogDescription>
          {user
            ? `Update ${user.name} details`
            : "Fill in the details to add a new user"}
        </DialogDescription>
      </DialogHeader>
      {user ? (
        <UserForm initialData={user} onSuccess={() => setOpen(false)} />
      ) : (
        <UserForm onSuccess={() => setOpen(false)} />
      )}
    </DialogContent>
  );
}
