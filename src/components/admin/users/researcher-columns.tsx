"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/components/data-table/datatable-header";
import { UserStatus } from "@/enum/user";
import { capitalizeFirstLetter } from "@/lib/format";
import { FileText, CheckCircle } from "lucide-react";
import { ResearcherActionsDropDown } from "./researcher-actions";

interface ResearcherUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  totalSurveys?: number;
  activeSurveys?: number;
}

export const ResearcherColumns: ColumnDef<ResearcherUser>[] = [
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
        className="bg-green-50 text-green-700 border-green-200"
      >
        <FileText className="mr-1 h-3 w-3" />
        {capitalizeFirstLetter(row.original.role, true)}
      </Badge>
    ),
  },
  // {
  //   accessorKey: "status",
  //   enableSorting: false,
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => (
  //     <Badge
  //       variant={
  //         row.original.status === UserStatus.ACTIVE ? "default" : "destructive"
  //       }
  //     >
  //       {row.original.status === UserStatus.ACTIVE ? "Active" : "Inactive"}
  //     </Badge>
  //   ),
  // },
  {
    accessorKey: "totalSurveys",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Surveys" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-sm">
        <FileText className="h-4 w-4 text-gray-400" />
        <span className="font-medium">{row.original.totalSurveys || 0}</span>
      </div>
    ),
  },
  {
    accessorKey: "activeSurveys",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active Surveys" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-sm">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span className="font-medium text-green-600">
          {row.original.activeSurveys || 0}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    enableSorting: false,
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
      return <ResearcherActionsDropDown user={user} />;
    },
  },
];

export type ResearcherTableColumnKeys = keyof ResearcherUser;
export type ResearcherTableColumnValues =
  ResearcherUser[ResearcherTableColumnKeys];
