"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SurveyCard } from "./survey-card";
import { FileText } from "lucide-react";
import { SurveyGridProps } from "@/types/surveys/surveys";
import { SurveyPagination } from "./survey-pagination";
import { SurveyFilters } from "./survey-filters";
import { EmptyState } from "@/components/shared/empty-state";
import { toast } from "sonner";
import CustomAxios from "@/app/api/CustomAxios";
import { useAppSelector } from "@/lib/redux/hooks";

export function SurveyGrid({
  surveys,
  totalSurveys,
  currentPage,
  totalPages,
  pageSize,
}: SurveyGridProps) {
  const router = useRouter();
  const userId = useAppSelector((state) => state.auth.userId);

  const handleView = (surveyId: string) => {
    console.log("View survey:", surveyId);
    // Navigate to survey view/details page
    // router.push(`/admin/surveys/${surveyId}`);
  };

  const handleEdit = (surveyId: string) => {
    console.log("Edit survey:", surveyId);
    // Navigate to survey edit page
    // router.push(`/admin/surveys/${surveyId}/edit`);
  };

  const handleDelete = async (surveyId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this survey? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      // Call delete API endpoint
      const response = await CustomAxios.delete(
        `researcher/survey/delete/${surveyId}`
      );

      if (response.status === 200) {
        toast.success("Survey deleted successfully");
        // Refresh the page to update the surveys list
        window.location.reload();
      } else {
        toast.error("Failed to delete survey");
      }
    } catch (error: any) {
      console.log("Error deleting survey:", error);

      if (error.response?.status === 401) {
        toast.error("Authentication failed. Please log in again.");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to delete this survey.");
      } else if (error.response?.status === 404) {
        toast.error("Survey not found.");
      } else {
        toast.error("An error occurred while deleting the survey.");
      }
    }
  };

  const handleCreateSurvey = () => {
    router.push("/admin/create-survey");
  };

  return (
    <div className="space-y-6">
      <SurveyFilters totalSurveys={totalSurveys} />

      {surveys.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No surveys found"
          description="You haven't created any surveys yet, or no surveys match your current filters."
          actionText="Create Survey"
          onAction={handleCreateSurvey}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {surveys.map((survey) => (
              <SurveyCard
                key={survey.id}
                survey={survey}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <SurveyPagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={totalSurveys}
            />
          )}
        </>
      )}
    </div>
  );
}
