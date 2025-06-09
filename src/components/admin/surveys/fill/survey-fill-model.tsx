"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye, Loader2 } from "lucide-react";
import { Survey, SurveyResponse } from "@/types/surveys/surveys";
import { SurveyFillForm } from "./fill-form";
import { Progress } from "@/components/ui/progress";
import CustomAxios from "@/app/api/CustomAxios";
import { toast } from "sonner";
import { useAppSelector } from "@/lib/redux/hooks";

interface SurveyFillModalProps {
  survey: Survey | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (response: SurveyResponse) => void;
  isViewMode?: boolean;
}

// Type for the API request payload
interface SaveAnswersPayload {
  questionId: number;
  answer: Array<{
    answerId: string;
    answer: string;
  }>;
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get userId from Redux store
  const userId = useAppSelector((state: any) => state.auth.userId);

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

  // Transform responses to API format
  const transformResponsesForAPI = (): SaveAnswersPayload[] => {
    const apiPayload: SaveAnswersPayload[] = [];

    Object.entries(responses).forEach(([questionId, response]) => {
      const question = survey.questions.find((q) => q.id === questionId);
      if (!question) return;

      let answers: Array<{ answerId: string; answer: string }> = [];

      switch (question.type) {
        case "single_select":
        case "yes_no":
          // For single select, response should be the option ID
          if (response) {
            const selectedOption = question.options?.find(
              (opt) => opt.id === response
            );
            answers.push({
              answerId: response,
              answer: selectedOption?.text || response,
            });
          }
          break;

        case "multi_select":
          // For multi select, response should be an array of option IDs
          if (Array.isArray(response)) {
            response.forEach((optionId) => {
              const selectedOption = question.options?.find(
                (opt) => opt.id === optionId
              );
              answers.push({
                answerId: optionId,
                answer: selectedOption?.text || optionId,
              });
            });
          }
          break;

        case "text":
        case "textarea":
        case "number":
          // For text inputs, create a single answer entry
          if (response) {
            answers.push({
              answerId: "text_answer", // You might want to generate a unique ID here
              answer: response.toString(),
            });
          }
          break;

        case "rating":
          // For rating, response should be the rating value
          if (response) {
            answers.push({
              answerId: "rating_answer", // You might want to generate a unique ID here
              answer: response.toString(),
            });
          }
          break;

        default:
          // Handle any other question types
          if (response) {
            answers.push({
              answerId: "general_answer",
              answer: response.toString(),
            });
          }
          break;
      }

      if (answers.length > 0) {
        apiPayload.push({
          questionId: parseInt(questionId), // Convert string ID to number
          answer: answers,
        });
      }
    });

    return apiPayload;
  };

  // API call to save answers
  const saveAnswersToAPI = async (): Promise<boolean> => {
    if (!userId) {
      toast.error("User not authenticated. Please log in again.");
      return false;
    }

    try {
      setIsSubmitting(true);

      const apiPayload = transformResponsesForAPI();
      console.log("Sending survey answers to API:", apiPayload);

      const response = await CustomAxios.post(
        `/respondent/survey/saveAnswers/${survey.id}/${userId}`,
        apiPayload
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Survey submitted successfully!");
        return true;
      } else {
        toast.error("Failed to submit survey. Please try again.");
        return false;
      }
    } catch (error: any) {
      console.log("Error submitting survey:", error);

      if (error.response?.status === 401) {
        toast.error("Authentication failed. Please log in again.");
      } else if (error.response?.status === 400) {
        toast.error("Invalid survey data. Please check your answers.");
      } else if (error.response?.status === 404) {
        toast.error("Survey not found.");
      } else {
        toast.error("Failed to submit survey. Please try again.");
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (isViewMode) {
      handleClose();
      return;
    }

    // Validate that we have a userId
    if (!userId) {
      toast.error("User not authenticated. Please log in again.");
      return;
    }

    // Save to API first
    const success = await saveAnswersToAPI();

    if (success) {
      // Create the local response object for the parent component
      const surveyResponse: SurveyResponse = {
        surveyId: survey.id,
        responses,
      };

      console.log("Survey response submitted locally:", surveyResponse);

      // Call the parent's onSubmit handler
      onSubmit(surveyResponse);

      // Close the modal and reset
      handleClose();
    }
    // If API call fails, don't close the modal so user can retry
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
            disabled={currentPage === 0 || isSubmitting}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              {isViewMode ? "Close" : "Cancel"}
            </Button>

            {currentPage === totalPages - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </div>
                ) : isViewMode ? (
                  "Close Preview"
                ) : (
                  "Submit Survey"
                )}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed() || isSubmitting}
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
