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
    accessorKey: "lastName",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "role",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
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
