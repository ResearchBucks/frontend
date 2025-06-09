"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/components/data-table/datatable-header";
import ActionsDropDown from "./actions-dropdown";
import { UserRoles, UserStatus } from "@/enum/user";
import { AdminUser } from "@/types/user/users";

export const AdminColumns: ColumnDef<AdminUser>[] = [
  {
    accessorKey: "fistName",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
  },
  {
    accessorKey: "lastName",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: "email",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "role",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
  },
  {
    accessorKey: "status",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status === UserStatus.ACTIVE ? "default" : "destructive"
        }
      >
        {row.original.status === UserStatus.ACTIVE ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableSorting: false,
    cell: ({ row }) => {
      const user = row.original;

      return <ActionsDropDown user={user} />;
    },
  },
];

export type TableColumnKeys = keyof AdminUser;
export type TableColumnValues = AdminUser[TableColumnKeys];
