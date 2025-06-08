"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Survey } from "@/types/surveys/surveys";
import { DataTableColumnHeader } from "@/components/data-table/datatable-header";
import { DollarSign } from "lucide-react";
import { SurveyActionsDropDown } from "./survey-action-dropdown";

const statusConfig = {
  active: {
    label: "Active",
    variant: "default" as const,
    className: "bg-green-100 text-green-800 hover:bg-green-200",
  },
  completed: {
    label: "Completed",
    variant: "secondary" as const,
    className: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  },
  draft: {
    label: "Draft",
    variant: "outline" as const,
    className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  },
  expired: {
    label: "Expired",
    variant: "destructive" as const,
    className: "bg-red-100 text-red-800 hover:bg-red-200",
  },
};

export const SurveyColumns: ColumnDef<Survey>[] = [
  {
    accessorKey: "title",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px]">
        <div className="font-medium text-gray-900 truncate">
          {row.original.title}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "description",
    enableSorting: false,
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-[300px]">
        <p className="text-sm text-gray-600 line-clamp-2">
          {row.original.description}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      const statusInfo = statusConfig[status as keyof typeof statusConfig];

      return (
        <Badge variant={statusInfo.variant} className={statusInfo.className}>
          {statusInfo.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "price",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center text-green-600 font-medium">
        <DollarSign className="mr-1 h-4 w-4" />
        <span>{row.original.price.toFixed(2)}</span>
      </div>
    ),
  },
  {
    accessorKey: "dueDate",
    enableSorting: false,
    sortingFn: "datetime",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Due Date"
        ascPlaceholder="Order by Earliest"
        descPlaceholder="Order by Latest"
      />
    ),
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;
      const dueTime = row.original.dueTime;

      if (!dueDate) return "N/A";

      return (
        <div className="text-sm">
          <div className="font-medium">{format(new Date(dueDate), "PPP")}</div>
          {dueTime && <div className="text-gray-500">{dueTime}</div>}
        </div>
      );
    },
  },
  {
    accessorKey: "questions",
    enableSorting: false,
    header: "Questions",
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">
        {row.original.questions?.length || 0} questions
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
        title="Created Date"
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
    header: "Actions",
    cell: ({ row }) => {
      const survey = row.original;
      return <SurveyActionsDropDown survey={survey} />;
    },
  },
];

export type TableColumnKeys = keyof Survey;
export type TableColumnValues = Survey[TableColumnKeys];
