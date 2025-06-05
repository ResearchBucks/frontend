"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Clock,
  DollarSign,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  FileText,
  Users,
} from "lucide-react";
import { SurveyCardProps, SurveyResponse } from "@/types/surveys/surveys";
import { SurveyFillModal } from "./fill/survey-fill-model";

const statusConfig = {
  active: {
    label: "Active",
    variant: "default" as const,
    className: "bg-green-100 text-green-800 hover:bg-green-200",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  completed: {
    label: "Completed",
    variant: "secondary" as const,
    className: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  draft: {
    label: "Draft",
    variant: "outline" as const,
    className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
  },
  expired: {
    label: "Expired",
    variant: "destructive" as const,
    className: "bg-red-100 text-red-800 hover:bg-red-200",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
};

export function SurveyCard({
  survey,
  onView,
  onEdit,
  onDelete,
  onFillSurvey,
}: SurveyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const statusInfo = statusConfig[survey.status];

  const handleView = () => {
    if (onView) {
      onView(survey.id);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(survey.id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(survey.id);
    }
  };

  const handleFillSurvey = () => {
    setIsModalOpen(true);
  };

  const handleSurveySubmit = (response: SurveyResponse) => {
    if (onFillSurvey) {
      onFillSurvey(response);
    }
    console.log("Survey response submitted:", response);
  };

  return (
    <>
      <Card
        className={`group hover:shadow-lg transition-all duration-200 border-2 ${statusInfo.borderColor} hover:border-teal-300 ${statusInfo.bgColor}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-100 rounded-lg">
                <FileText className="h-5 w-5 text-teal-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {survey.title}
                  </CardTitle>
                </div>
                <Badge
                  variant={statusInfo.variant}
                  className={`${statusInfo.className} text-xs`}
                >
                  {statusInfo.label}
                </Badge>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={handleView}
                  className="cursor-pointer"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleFillSurvey}
                  className="cursor-pointer text-teal-600 focus:text-teal-600"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Fill Survey
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleEdit}
                  className="cursor-pointer"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Survey
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="py-3">
          <CardDescription className="text-sm text-gray-600 line-clamp-2 mb-4">
            {survey.description}
          </CardDescription>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                <span>Due: {survey.dueDate}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-2 h-4 w-4 text-gray-400" />
                <span>Time: {survey.dueTime}</span>
              </div>
            </div>

            <div className="flex flex-col items-end justify-center">
              <div className="flex items-center text-lg font-semibold text-green-600 mb-1">
                <DollarSign className="mr-1 h-5 w-5" />
                <span>${survey.price.toFixed(1)}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <FileText className="mr-1 h-3 w-3" />
                <span>
                  {survey.questions.length} question
                  {survey.questions.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Progress or additional info bar */}
          <div className="bg-gray-100 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Survey Status</span>
              <span
                className={`font-medium ${
                  survey.status === "active"
                    ? "text-green-600"
                    : survey.status === "completed"
                    ? "text-blue-600"
                    : survey.status === "draft"
                    ? "text-gray-600"
                    : "text-red-600"
                }`}
              >
                {survey.status === "active"
                  ? "Ready to Fill"
                  : survey.status === "completed"
                  ? "Completed"
                  : survey.status === "draft"
                  ? "In Draft"
                  : "Expired"}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0 pb-4">
          <div className="w-full space-y-2">
            <Button
              onClick={handleFillSurvey}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium"
              disabled={survey.status !== "active"}
            >
              {survey.status === "active"
                ? "Fill Survey"
                : survey.status === "completed"
                ? "Already Completed"
                : survey.status === "draft"
                ? "Survey in Draft"
                : "Survey Expired"}
            </Button>

            <Button
              onClick={handleView}
              variant="outline"
              className="w-full text-gray-600 hover:text-gray-900 border-gray-300 hover:border-gray-400"
              size="sm"
            >
              View Details
            </Button>
          </div>
        </CardFooter>
      </Card>

      <SurveyFillModal
        survey={survey}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSurveySubmit}
      />
    </>
  );
}
