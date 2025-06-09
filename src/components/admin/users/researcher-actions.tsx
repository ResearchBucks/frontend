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
import {
  MoreHorizontal,
  Eye,
  Edit,
  UserX,
  UserCheck,
  FileText,
} from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "sonner";

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

interface ResearcherActionsDropDownProps {
  user: ResearcherUser;
}

export function ResearcherActionsDropDown({
  user,
}: ResearcherActionsDropDownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleViewUser = () => {
    setIsViewOpen(true);
    setIsDropdownOpen(false);
    // Here you would typically open a user profile view dialog
    toast.info(`Viewing researcher: ${user.name}`);
  };

  const handleEditUser = () => {
    setIsEditOpen(true);
    setIsDropdownOpen(false);
    // Here you would typically open an edit user dialog
    toast.info(`Editing researcher: ${user.name}`);
  };

  const handleToggleStatus = async () => {
    try {
      const newStatus = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      // API call would go here
      toast.success(`Researcher ${newStatus.toLowerCase()} successfully`);
      setIsDropdownOpen(false);
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  const handleViewSurveys = () => {
    setIsDropdownOpen(false);
    // Navigate to researcher's surveys
    toast.info(`Viewing surveys for: ${user.name}`);
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
              onClick={handleViewUser}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleViewSurveys}
            >
              <FileText className="mr-2 h-4 w-4" />
              View Surveys ({user.totalSurveys || 0})
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleEditUser}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={`cursor-pointer ${
                user.status === "ACTIVE"
                  ? "hover:!text-red-600"
                  : "hover:!text-green-600"
              }`}
              onClick={handleToggleStatus}
            >
              {user.status === "ACTIVE" ? (
                <>
                  <UserX className="mr-2 h-4 w-4" />
                  Deactivate User
                </>
              ) : (
                <>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Activate User
                </>
              )}
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
