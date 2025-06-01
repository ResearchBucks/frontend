"use client";

import React from "react";
import { SurveyCard } from "./survey-card";
import { FileText } from "lucide-react";
import { SurveyGridProps } from "@/types/surveys/surveys";
import { SurveyPagination } from "./survey-pagination";
import { SurveyFilters } from "./survey-filters";
import { EmptyState } from "@/components/shared/empty-state";

export function SurveyGrid({
  surveys,
  totalSurveys,
  currentPage,
  totalPages,
  pageSize,
}: SurveyGridProps) {
  const handleView = (surveyId: string) => {
    console.log("View survey:", surveyId);
    // Add navigation logic here
  };

  const handleEdit = (surveyId: string) => {
    console.log("Edit survey:", surveyId);
    // Add edit logic here
  };

  const handleDelete = (surveyId: string) => {
    console.log("Delete survey:", surveyId);
    // Add delete logic here
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
          onAction={() => console.log("Create new survey")}
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
