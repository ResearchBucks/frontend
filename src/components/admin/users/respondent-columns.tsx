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
    accessorKey: "email",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="text-gray-600">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "role",
    enableSorting: false,
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
    accessorKey: "totalResponses",
    enableSorting: false,
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
