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
  Loader2,
} from "lucide-react";
import {
  SurveyCardProps,
  SurveyResponse,
  Survey,
  Question,
  QuestionType,
} from "@/types/surveys/surveys";
import { SurveyFillModal } from "./fill/survey-fill-model";
import CustomAxios from "@/app/api/CustomAxios";
import { toast } from "sonner";

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

type GetSurveyQuestionsResponse = {
  status: string;
  message: string;
  data: {
    id: string;
    surveyId: number;
    questions: {
      [key: string]: {
        question: string;
        sinQuestion: string;
        isRequired: boolean;
        type: string;
        options: Array<{
          id: string;
          text: string;
          sinhalaText: string;
        }>;
      };
    };
    researcherId: number;
  };
};

export function SurveyCard({
  survey,
  onView,
  onEdit,
  onDelete,
  onFillSurvey,
}: SurveyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [surveyWithQuestions, setSurveyWithQuestions] = useState<Survey | null>(
    null
  );
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const statusInfo = statusConfig[survey.status];

  // Function to map API question type to Survey question type
  const mapApiQuestionTypeToSurveyType = (apiType: string): QuestionType => {
    const typeMapping: { [key: string]: QuestionType } = {
      SINGLE_SELECT: "single_select",
      MULTI_SELECT: "multi_select",
      TEXT: "text",
      TEXTAREA: "textarea",
      YES_NO: "yes_no",
      RATING: "rating",
      NUMBER: "number",
    };
    return typeMapping[apiType] || "text";
  };

  // Updated function to transform API questions to Survey questions
  const transformApiQuestionsToQuestions = (apiQuestionsObject: {
    [key: string]: any;
  }): Question[] => {
    const questions: Question[] = [];

    // Convert the questions object to an array
    Object.keys(apiQuestionsObject).forEach((questionKey, index) => {
      const apiQuestion = apiQuestionsObject[questionKey];

      const question: Question = {
        id: questionKey, // Use the key as the ID
        text: apiQuestion.question || "",
        sinhalaText: apiQuestion.sinQuestion || "",
        type: mapApiQuestionTypeToSurveyType(apiQuestion.type),
        options: (apiQuestion.options || []).map((option: any) => ({
          id: option.id || "",
          text: option.text || "",
          sinhalaText: option.sinhalaText || "",
        })),
        required: apiQuestion.isRequired || false,
        order: parseInt(questionKey), // Use the question key as order
      };

      questions.push(question);
    });

    // Sort questions by order
    return questions.sort((a, b) => a.order - b.order);
  };

  // Function to fetch survey questions from API
  const fetchSurveyQuestions = async (
    surveyId: string
  ): Promise<Question[]> => {
    try {
      setLoadingQuestions(true);

      const response = await CustomAxios.get<GetSurveyQuestionsResponse>(
        `researcher/survey/getSurveyQuestions/${surveyId}`
      );
      console.log("API Response:", response.data);

      if (
        response.status === 200 &&
        response.data.data &&
        response.data.data.questions
      ) {
        return transformApiQuestionsToQuestions(response.data.data.questions);
      } else {
        toast.error("Failed to fetch survey questions");
        return [];
      }
    } catch (error: any) {
      console.error("Error fetching survey questions:", error);

      if (error.response?.status === 401) {
        toast.error("Authentication failed. Please log in again.");
      } else if (error.response?.status === 404) {
        toast.error("Survey questions not found.");
      } else {
        toast.error("Failed to load survey questions. Please try again.");
      }
      return [];
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleView = async () => {
    try {
      // Fetch questions from API for view mode
      const questions = await fetchSurveyQuestions(survey.id);

      if (questions.length === 0) {
        toast.error("No questions found for this survey.");
        return;
      }

      // Create survey object with fetched questions
      const surveyWithApiQuestions: Survey = {
        ...survey,
        questions: questions,
      };

      setSurveyWithQuestions(surveyWithApiQuestions);
      setIsViewMode(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error loading survey for view:", error);
      toast.error("Failed to load survey details. Please try again.");
    }

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

  const handleFillSurvey = async () => {
    try {
      // Fetch questions from API
      const questions = await fetchSurveyQuestions(survey.id);

      if (questions.length === 0) {
        toast.error("No questions found for this survey.");
        return;
      }

      // Create survey object with fetched questions
      const surveyWithApiQuestions: Survey = {
        ...survey,
        questions: questions,
      };

      setSurveyWithQuestions(surveyWithApiQuestions);
      setIsViewMode(false);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error preparing survey:", error);
      toast.error("Failed to load survey. Please try again.");
    }
  };

  const handleSurveySubmit = (response: SurveyResponse) => {
    if (onFillSurvey) {
      onFillSurvey(response);
    }
    console.log("Survey response submitted:", response);

    // Close modal and reset
    setIsModalOpen(false);
    setSurveyWithQuestions(null);
    setIsViewMode(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSurveyWithQuestions(null);
    setIsViewMode(false);
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
                  disabled={loadingQuestions}
                >
                  {loadingQuestions ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Eye className="mr-2 h-4 w-4" />
                  )}
                  {loadingQuestions ? "Loading..." : "View Details"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleFillSurvey}
                  className="cursor-pointer text-teal-600 focus:text-teal-600"
                  disabled={loadingQuestions}
                >
                  {loadingQuestions ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Users className="mr-2 h-4 w-4" />
                  )}
                  {loadingQuestions ? "Loading..." : "Fill Survey"}
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
              disabled={survey.status !== "active" || loadingQuestions}
            >
              {loadingQuestions ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading Questions...
                </div>
              ) : survey.status === "active" ? (
                "Fill Survey"
              ) : survey.status === "completed" ? (
                "Already Completed"
              ) : survey.status === "draft" ? (
                "Survey in Draft"
              ) : (
                "Survey Expired"
              )}
            </Button>

            <Button
              onClick={handleView}
              variant="outline"
              className="w-full text-gray-600 hover:text-gray-900 border-gray-300 hover:border-gray-400"
              size="sm"
              disabled={loadingQuestions}
            >
              {loadingQuestions ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : (
                "View Details"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>

      <SurveyFillModal
        survey={surveyWithQuestions}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSurveySubmit}
        isViewMode={isViewMode}
      />
    </>
  );
}
