"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Survey, SurveyResponse } from "@/types/surveys/surveys";
import { SurveyFillForm } from "./fill-form";
import { Progress } from "@/components/ui/progress";

interface SurveyFillModalProps {
  survey: Survey | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (response: SurveyResponse) => void;
  isViewMode?: boolean;
}

export function SurveyFillModal({
  survey,
  isOpen,
  onClose,
  onSubmit,
  isViewMode = false,
}: SurveyFillModalProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});

  if (!survey) return null;

  const questionsPerPage = 5;
  const totalPages = Math.ceil(survey.questions.length / questionsPerPage);
  const currentQuestions = survey.questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const progress = ((currentPage + 1) / totalPages) * 100;

  const handleResponseChange = (questionId: string, value: any) => {
    if (isViewMode) return; // Don't allow changes in view mode

    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const canProceed = () => {
    if (isViewMode) return true; // Always allow navigation in view mode

    return currentQuestions.every((question) => {
      if (!question.required) return true;
      const response = responses[question.id];
      if (question.type === "multi_select") {
        return Array.isArray(response) && response.length > 0;
      }
      return response !== undefined && response !== "" && response !== null;
    });
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (isViewMode) {
      handleClose();
      return;
    }

    const surveyResponse: SurveyResponse = {
      id: crypto.randomUUID(),
      surveyId: survey.id,
      responses,
      submittedAt: new Date().toISOString(),
    };

    onSubmit(surveyResponse);
    onClose();

    // Reset form
    setCurrentPage(0);
    setResponses({});
  };

  const handleClose = () => {
    setCurrentPage(0);
    setResponses({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center gap-2">
            {isViewMode && <Eye className="h-5 w-5 text-teal-600" />}
            <DialogTitle className="text-xl font-semibold text-gray-900">
              {isViewMode ? `Preview: ${survey.title}` : survey.title}
            </DialogTitle>
          </div>
          {survey.description && (
            <p className="text-sm text-gray-600 mt-2">{survey.description}</p>
          )}
          {isViewMode && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
              <p className="text-sm text-blue-800 font-medium">
                📋 Survey Preview Mode
              </p>
              <p className="text-xs text-blue-600 mt-1">
                This is a read-only preview of the survey questions and options.
              </p>
            </div>
          )}
        </DialogHeader>

        {/* Progress Bar */}
        <div className="flex-shrink-0 space-y-2 mb-6">
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Page {currentPage + 1} of {totalPages}
            </span>
            <span>
              {Math.round(progress)}% {isViewMode ? "Viewed" : "Complete"}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto">
          <SurveyFillForm
            questions={currentQuestions}
            responses={responses}
            onResponseChange={handleResponseChange}
            pageNumber={currentPage + 1}
            isViewMode={isViewMode}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex-shrink-0 flex justify-between items-center pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose}>
              {isViewMode ? "Close" : "Cancel"}
            </Button>

            {currentPage === totalPages - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                {isViewMode ? "Close Preview" : "Submit Survey"}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
