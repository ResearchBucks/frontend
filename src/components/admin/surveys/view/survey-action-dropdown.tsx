"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Survey } from "@/types/surveys/surveys";
import { toast } from "sonner";
import CustomAxios from "@/app/api/CustomAxios";
import { SurveyViewDialog } from "./survey-view-dialog";
import { SurveyStatusDialog } from "./survey-status-dialog";

interface SurveyActionsDropDownProps {
  survey: Survey;
}

export function SurveyActionsDropDown({ survey }: SurveyActionsDropDownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [statusAction, setStatusAction] = useState<
    "approve" | "reject" | "pending"
  >("approve");
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (
    newStatus: "approve" | "reject" | "pending",
    reason?: string
  ) => {
    setIsLoading(true);
    try {
      // Map the action to the actual status
      const statusMap = {
        approve: "active",
        reject: "expired",
        pending: "draft",
      };

      const response = await CustomAxios.patch(
        `/admin/survey/updateStatus/${survey.id}`,
        {
          status: statusMap[newStatus],
          reason: reason || "",
        }
      );

      if (response.status === 200) {
        toast.success(`Survey ${newStatus}d successfully`);
        // Refresh the page or update the data
        window.location.reload();
      }
    } catch (error: any) {
      console.error("Error updating survey status:", error);
      toast.error(
        error.response?.data?.message || `Failed to ${newStatus} survey`
      );
    } finally {
      setIsLoading(false);
      setIsStatusDialogOpen(false);
    }
  };

  const openStatusDialog = (action: "approve" | "reject" | "pending") => {
    setStatusAction(action);
    setIsStatusDialogOpen(true);
    setIsDropdownOpen(false);
  };

  const getStatusActions = () => {
    const actions = [];

    // Show different actions based on current status
    if (survey.status === "draft") {
      actions.push(
        <DropdownMenuItem
          key="approve"
          className="cursor-pointer text-green-600 hover:!text-green-700"
          onClick={() => openStatusDialog("approve")}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Approve Survey
        </DropdownMenuItem>
      );
      actions.push(
        <DropdownMenuItem
          key="reject"
          className="cursor-pointer text-red-600 hover:!text-red-700"
          onClick={() => openStatusDialog("reject")}
        >
          <XCircle className="mr-2 h-4 w-4" />
          Reject Survey
        </DropdownMenuItem>
      );
    } else if (survey.status === "active") {
      actions.push(
        <DropdownMenuItem
          key="pending"
          className="cursor-pointer text-yellow-600 hover:!text-yellow-700"
          onClick={() => openStatusDialog("pending")}
        >
          <Clock className="mr-2 h-4 w-4" />
          Mark as Pending
        </DropdownMenuItem>
      );
      actions.push(
        <DropdownMenuItem
          key="reject"
          className="cursor-pointer text-red-600 hover:!text-red-700"
          onClick={() => openStatusDialog("reject")}
        >
          <XCircle className="mr-2 h-4 w-4" />
          Reject Survey
        </DropdownMenuItem>
      );
    } else if (survey.status === "expired") {
      actions.push(
        <DropdownMenuItem
          key="approve"
          className="cursor-pointer text-green-600 hover:!text-green-700"
          onClick={() => openStatusDialog("approve")}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Reactivate Survey
        </DropdownMenuItem>
      );
    }

    return actions;
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col gap-1">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setIsViewOpen(true);
                setIsDropdownOpen(false);
              }}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Survey
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {getStatusActions()}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <SurveyViewDialog
          survey={survey}
          onClose={() => setIsViewOpen(false)}
        />
      </Dialog>

      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <SurveyStatusDialog
          survey={survey}
          action={statusAction}
          onConfirm={handleStatusChange}
          onCancel={() => setIsStatusDialogOpen(false)}
          isLoading={isLoading}
        />
      </Dialog>
    </>
  );
}
