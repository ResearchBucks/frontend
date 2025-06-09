"use client";

import { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { Survey } from "@/types/surveys/surveys";

interface SurveyStatusDialogProps {
  survey: Survey;
  action: "approve" | "reject" | "pending";
  onConfirm: (
    action: "approve" | "reject" | "pending",
    reason?: string
  ) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

const actionConfig = {
  approve: {
    title: "Approve Survey",
    description:
      "This will activate the survey and make it available for participants.",
    icon: CheckCircle,
    iconColor: "text-green-600",
    buttonText: "Approve Survey",
    buttonClass: "bg-green-600 hover:bg-green-700",
    alertType: "default" as const,
    badge: "Active",
    badgeClass: "bg-green-100 text-green-800",
  },
  reject: {
    title: "Reject Survey",
    description:
      "This will mark the survey as expired and prevent participation.",
    icon: XCircle,
    iconColor: "text-red-600",
    buttonText: "Reject Survey",
    buttonClass: "bg-red-600 hover:bg-red-700",
    alertType: "destructive" as const,
    badge: "Expired",
    badgeClass: "bg-red-100 text-red-800",
  },
  pending: {
    title: "Mark as Pending",
    description: "This will move the survey back to draft status for review.",
    icon: Clock,
    iconColor: "text-yellow-600",
    buttonText: "Mark as Pending",
    buttonClass: "bg-yellow-600 hover:bg-yellow-700",
    alertType: "default" as const,
    badge: "Draft",
    badgeClass: "bg-gray-100 text-gray-800",
  },
};

export function SurveyStatusDialog({
  survey,
  action,
  onConfirm,
  onCancel,
  isLoading,
}: SurveyStatusDialogProps) {
  const [reason, setReason] = useState("");
  const config = actionConfig[action];
  const IconComponent = config.icon;

  const handleConfirm = async () => {
    await onConfirm(action, reason.trim() || undefined);
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <IconComponent className={`h-5 w-5 ${config.iconColor}`} />
          {config.title}
        </DialogTitle>
        <DialogDescription>{config.description}</DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        {/* Survey Info */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Survey:</span>
            <Badge className={config.badgeClass}>{config.badge}</Badge>
          </div>
          <p className="text-sm text-gray-900 font-medium">{survey.title}</p>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
            {survey.description}
          </p>
        </div>

        {/* Alert */}
        <Alert variant={config.alertType}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {action === "approve" &&
              "Once approved, participants will be able to take this survey."}
            {action === "reject" &&
              "Once rejected, this survey will be marked as expired and participants won't be able to access it."}
            {action === "pending" &&
              "This survey will be moved back to draft status and won't be accessible to participants."}
          </AlertDescription>
        </Alert>
      </div>

      <DialogFooter className="gap-2">
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          className={config.buttonClass}
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <IconComponent className="mr-2 h-4 w-4" />
              {config.buttonText}
            </>
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
