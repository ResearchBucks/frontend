"use client";

import React from "react";
import Image from "next/image";
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
} from "lucide-react";
import { SurveyCardProps } from "@/types/surveys/surveys";

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

export function SurveyCard({
  survey,
  onView,
  onEdit,
  onDelete,
}: SurveyCardProps) {
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

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-gray-300">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
          <Image
            src={survey.imageUrl || "/api/placeholder/400/300"}
            alt={survey.title}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge
              variant={statusInfo.variant}
              className={statusInfo.className}
            >
              {statusInfo.label}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 bg-white/80 hover:bg-white transition-colors"
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
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {survey.title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2 mb-3">
          {survey.description}
        </CardDescription>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Due: {survey.dueDate}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="mr-2 h-4 w-4" />
            <span>Time: {survey.dueTime}</span>
          </div>
          <div className="flex items-center text-sm font-medium text-green-600">
            <DollarSign className="mr-1 h-4 w-4" />
            <span>${survey.price.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleView}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white"
        >
          View
        </Button>
      </CardFooter>
    </Card>
  );
}
