"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/components/data-table/datatable-header";
import { UserStatus } from "@/enum/user";
import { capitalizeFirstLetter } from "@/lib/format";
import { MessageSquare, Clock, UserCheck } from "lucide-react";
import { RespondentActionsDropDown } from "./respondent-actions";

interface RespondentUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  totalResponses?: number;
  lastActivity?: string;
}

export const RespondentColumns: ColumnDef<RespondentUser>[] = [
  {
    accessorKey: "name",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="font-medium text-gray-900">{row.original.name}</div>
      </div>
    ),
  },
  {
    accessorKey: "email",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="text-gray-600">{row.original.email}</div>
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
        variant="outline"
        className="bg-teal-50 text-teal-700 border-teal-200"
      >
        <UserCheck className="mr-1 h-3 w-3" />
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
    accessorKey: "totalResponses",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Responses" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-sm">
        <MessageSquare className="h-4 w-4 text-gray-400" />
        <span className="font-medium">{row.original.totalResponses || 0}</span>
      </div>
    ),
  },
  {
    accessorKey: "lastActivity",
    enableSorting: true,
    sortingFn: "datetime",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Last Activity"
        ascPlaceholder="Order by Oldest"
        descPlaceholder="Order by Recent"
      />
    ),
    cell: ({ row }) => {
      const lastActivity = row.original.lastActivity;
      if (!lastActivity) {
        return (
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>No activity</span>
          </div>
        );
      }
      return (
        <div className="flex items-center gap-1 text-sm">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>{format(new Date(lastActivity), "PPP")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    enableSorting: true,
    sortingFn: "datetime",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Joined Date"
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
      return <RespondentActionsDropDown user={user} />;
    },
  },
];

export type RespondentTableColumnKeys = keyof RespondentUser;
export type RespondentTableColumnValues =
  RespondentUser[RespondentTableColumnKeys];
