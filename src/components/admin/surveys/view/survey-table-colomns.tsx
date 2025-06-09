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

const approvalStatusConfig = {
  approved: {
    label: "Approved",
    variant: "default" as const,
    className: "bg-green-100 text-green-800 hover:bg-green-200",
  },
  rejected: {
    label: "Rejected",
    variant: "destructive" as const,
    className: "bg-red-100 text-red-800 hover:bg-red-200",
  },
  pending: {
    label: "Pending",
    variant: "secondary" as const,
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  },
};

// Helper function to determine approval status from API data
const getApprovalStatus = (
  survey: any
): "approved" | "rejected" | "pending" => {
  console.log("Survey:", survey);
  if (survey.isVerified) return "approved";
  if (survey.isRejected) return "rejected";
  return "pending";
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
    id: "approvalStatus",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approval Status" />
    ),
    cell: ({ row }) => {
      // Get the approval status from the original API data
      const approvalStatus = getApprovalStatus(row.original as any);
      const statusInfo = approvalStatusConfig[approvalStatus];

      return (
        <Badge variant={statusInfo.variant} className={statusInfo.className}>
          {statusInfo.label}
        </Badge>
      );
    },
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

      try {
        return (
          <div className="text-sm">
            <div className="font-medium">
              {format(new Date(dueDate), "PPP")}
            </div>
            {dueTime && <div className="text-gray-500">{dueTime}</div>}
          </div>
        );
      } catch (error) {
        return <div className="text-sm text-gray-500">Invalid date</div>;
      }
    },
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

      try {
        return format(new Date(date), "PPP");
      } catch (error) {
        return <div className="text-sm text-gray-500">Invalid date</div>;
      }
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
