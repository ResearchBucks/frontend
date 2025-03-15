import { IUser } from "@/types/user/users";
import {
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/action/admin/user";
import { toast } from "sonner";
import { useTransition } from "react";

interface DeleteConfirmProps {
  user: IUser;
  onSuccess: () => void;
}

export default function DeleteConfirmDialogConent({
  user,
  onSuccess,
}: DeleteConfirmProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        startTransition(async () => {
          try {
            const result = await deleteUser(user._id);

            if (result.success) {
              resolve(result);
              onSuccess();
            } else {
              reject(new Error(result.error || "Failed to delete user"));
            }
          } catch (error) {
            reject(
              error instanceof Error
                ? error
                : new Error("Failed to delete user")
            );
          }
        });
      });

    toast.promise(promise, {
      loading: "Deleting user...",
      success: "User deleted successfully",
      error: (err) => `${err.message}`,
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure you want to delete {user.name}?</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        {`This action is irreversible. This will permanently delete the user with `}
        <span className="font-bold">{`${user.email} `}</span>
        {`email address.`}
      </DialogDescription>
      <DialogFooter>
        <Button onClick={() => onSuccess()} variant="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="destructive"
          disabled={isPending}
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
