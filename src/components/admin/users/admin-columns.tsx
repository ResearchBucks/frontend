"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { IUser } from "@/types/user/users";
import { DataTableColumnHeader } from "@/components/data-table/datatable-header";
import ActionsDropDown from "./actions-dropdown";
import { UserRoles, UserStatus } from "@/enum/user";
import { capitalizeFirstLetter } from "@/lib/format";

export const AdminColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
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
    cell: ({ row }) => (
      <Badge
        variant={(() => {
          switch (row.original.role) {
            case UserRoles.ADMIN:
              return "secondary";
            case UserRoles.OPERATOR:
              return "default";
            case UserRoles.SCANNER:
              return "outline";
            default:
              return "secondary";
          }
        })()}
      >
        {capitalizeFirstLetter(row.original.role, true)}
      </Badge>
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
    accessorKey: "createdAt",
    enableSorting: true,
    sortingFn: "datetime",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Registered Date"
        ascPlaceholder="Order by Oldest"
        descPlaceholder="Order by Newest"
      />
    ),
    cell: ({ row }) => {
      const date = row.original.createdAt;
      if (!date) return "N/A";
      return format(new Date(date), "PPP");
    },
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

export type TableColumnKeys = keyof IUser;
export type TableColumnValues = IUser[TableColumnKeys];
