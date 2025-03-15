"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { UserDetailsSchema } from "@/schema/user/user-details";
import { UserRoles, UserStatus } from "@/enum/user";
import { createUser, updateUser } from "@/action/admin/user";
import { useTransition } from "react";
import { IUser } from "@/types/user/users";

interface UserFormProps {
  initialData?: IUser;
  onSuccess?: () => void;
}

export default function UserForm({ initialData, onSuccess }: UserFormProps) {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    email: initialData?.email || "",
    name: initialData?.name || "",
    profileImage: initialData?.profileImage || "",
    role: initialData?.role || UserRoles.ADMIN,
    dob: initialData?.dob || undefined,
    status: initialData?.status || undefined,
  };

  const form = useForm<z.infer<typeof UserDetailsSchema>>({
    resolver: zodResolver(UserDetailsSchema),
    defaultValues,
    mode: "onBlur",
  });

  async function onSubmit(values: z.infer<typeof UserDetailsSchema>) {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        startTransition(async () => {
          try {
            const result = initialData?._id
              ? await updateUser(initialData._id, values)
              : await createUser(values);

            if (result.success) {
              resolve(result);
              onSuccess?.();
            } else {
              reject(new Error(result.error || "Failed to process user"));
            }
          } catch (error) {
            reject(
              error instanceof Error
                ? error
                : new Error("Failed to process user")
            );
          }
        });
      });

    toast.promise(promise, {
      loading: initialData ? "Updating user..." : "Creating user...",
      success: () =>
        initialData
          ? "User updated successfully!"
          : "User created successfully!",
      error: (err) => `${err.message}`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Jhon" {...field} />
              </FormControl>
              <FormDescription>Enter name`</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="jhondoe@email.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter user email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(UserRoles).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the user role, Permissions might change on user role
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {initialData && (
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(UserStatus).map((status) => (
                      <SelectItem
                        key={status}
                        value={status}
                        className={
                          status === UserStatus.INACTIVE
                            ? "text-destructive"
                            : ""
                        }
                      >
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Change the user status to Active or Inactive
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {!initialData && (
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth (Optional)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      captionLayout="dropdown-buttons"
                      mode="single"
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      defaultMonth={new Date()}
                      fromDate={new Date("1900-01-01")}
                      toDate={new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" disabled={isPending}>
          {initialData ? "Update User" : "Create User"}
        </Button>
      </form>
    </Form>
  );
}
