"use client";

import { useState, useEffect } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  DollarSign,
  FileText,
  User,
  Loader2,
  CheckCircle,
  Circle,
  List,
  Type,
  Hash,
  Star,
} from "lucide-react";
import { Survey, Question } from "@/types/surveys/surveys";
import { format } from "date-fns";
import CustomAxios from "@/app/api/CustomAxios";
import { toast } from "sonner";
import { useAppSelector } from "@/lib/redux/hooks";
import { UserRoles } from "@/enum/user";

interface SurveyViewDialogProps {
  survey: Survey;
  onClose: () => void;
}

const statusConfig = {
  active: {
    label: "Active",
    variant: "default" as const,
    className: "bg-green-100 text-green-800",
  },
  completed: {
    label: "Completed",
    variant: "secondary" as const,
    className: "bg-blue-100 text-blue-800",
  },
  draft: {
    label: "Draft",
    variant: "outline" as const,
    className: "bg-gray-100 text-gray-800",
  },
  expired: {
    label: "Expired",
    variant: "destructive" as const,
    className: "bg-red-100 text-red-800",
  },
};

const questionTypeIcons = {
  single_select: Circle,
  multi_select: CheckCircle,
  text: Type,
  textarea: FileText,
  number: Hash,
  rating: Star,
  yes_no: CheckCircle,
};

type GetSurveyQuestionsResponse = {
  status: string;
  message: string;
  data: Array<{
    id: string;
    surveyId: number;
    questions: {
      [key: string]: {
        question: string;
        sinQuestion: string;
        isRequired: boolean;
        type: string;
        options: Array<{
          _id: string;
          text: string;
          sinhalaText: string;
        }>;
      };
    };
    researcherId: number;
  }>;
};

export function SurveyViewDialog({ survey, onClose }: SurveyViewDialogProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const statusInfo = statusConfig[survey.status as keyof typeof statusConfig];

  // Get user role from Redux store
  const userRole = useAppSelector((state: any) => state.auth.userRole);

  // Function to get the correct API endpoint based on user role
  const getApiEndpoint = (surveyId: string): string => {
    switch (userRole) {
      case UserRoles.ADMIN:
      case UserRoles.SUPER_ADMIN:
        return `/admin/survey/getSurveyQuestions/${surveyId}`;
      default:
        return `researcher/survey/getSurveyQuestions/${surveyId}`;
    }
  };

  // Function to map API question type to Survey question type
  const mapApiQuestionTypeToSurveyType = (
    apiType: string
  ): Question["type"] => {
    const typeMapping: { [key: string]: Question["type"] } = {
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

  // Transform API questions to Survey questions
  const transformApiQuestionsToQuestions = (apiQuestionsObject: {
    [key: string]: any;
  }): Question[] => {
    const transformedQuestions: Question[] = [];

    Object.keys(apiQuestionsObject).forEach((questionKey, index) => {
      const apiQuestion = apiQuestionsObject[questionKey];

      const question: Question = {
        id: questionKey,
        text: apiQuestion.question || "",
        sinhalaText: apiQuestion.sinQuestion || "",
        type: mapApiQuestionTypeToSurveyType(apiQuestion.type),
        options: (apiQuestion.options || []).map((option: any) => ({
          id: option._id || option.id || "",
          text: option.text || "",
          sinhalaText: option.sinhalaText || "",
        })),
        required: apiQuestion.isRequired || false,
        order: parseInt(questionKey),
      };

      transformedQuestions.push(question);
    });

    return transformedQuestions.sort((a, b) => a.order - b.order);
  };

  // Fetch survey questions
  const fetchSurveyQuestions = async () => {
    try {
      setLoading(true);
      const endpoint = getApiEndpoint(survey.id);

      const response = await CustomAxios.get<GetSurveyQuestionsResponse>(
        endpoint
      );

      if (
        response.status === 200 &&
        response.data.data &&
        Array.isArray(response.data.data) &&
        response.data.data.length > 0
      ) {
        // Get the latest questions (last item in array or find by surveyId)
        const surveyQuestions =
          response.data.data.find(
            (item) => item.surveyId.toString() === survey.id
          ) || response.data.data[response.data.data.length - 1];

        if (surveyQuestions && surveyQuestions.questions) {
          const transformedQuestions = transformApiQuestionsToQuestions(
            surveyQuestions.questions
          );
          setQuestions(transformedQuestions);
        } else {
          toast.error("No questions found for this survey");
        }
      } else {
        toast.error("Failed to fetch survey questions");
      }
    } catch (error: any) {
      console.log("Error fetching survey questions:", error);

      // Enhanced error handling
      if (error.response?.status === 401) {
        toast.error("Authentication failed. Please log in again.");
      } else if (error.response?.status === 403) {
        toast.error("Access denied. Insufficient permissions.");
      } else if (error.response?.status === 404) {
        toast.error("Survey questions not found.");
      } else {
        toast.error("Failed to load survey questions");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (survey.id && userRole) {
      fetchSurveyQuestions();
    }
  }, [survey.id, userRole]);

  const renderQuestionOptions = (question: Question) => {
    if (!question.options || question.options.length === 0) {
      return null;
    }

    return (
      <div className="mt-3 pl-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Options:</div>
        <div className="space-y-1">
          {question.options.map((option, index) => (
            <div
              key={option.id}
              className="flex items-center text-sm text-gray-600"
            >
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs mr-2">
                {index + 1}
              </span>
              <span>{option.text}</span>
              {option.sinhalaText && option.sinhalaText !== option.text && (
                <span className="ml-2 text-gray-500">
                  ({option.sinhalaText})
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl">
          <FileText className="h-5 w-5 text-teal-600" />
          Survey Details
        </DialogTitle>
        <DialogDescription>
          View comprehensive survey information and questions
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* Survey Header Information */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg text-gray-900 mb-2">
                  {survey.title}
                </CardTitle>
                <Badge
                  variant={statusInfo.variant}
                  className={statusInfo.className}
                >
                  {statusInfo.label}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">{survey.description}</p>

            {/* Survey Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="font-medium">Due Date</div>
                  <div className="text-gray-600">
                    {format(new Date(survey.dueDate), "PPP")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="font-medium">Due Time</div>
                  <div className="text-gray-600">
                    {survey.dueTime || "Not specified"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-green-600" />
                <div>
                  <div className="font-medium">Price</div>
                  <div className="text-green-600 font-semibold">
                    ${survey.price.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="font-medium">Questions</div>
                  <div className="text-gray-600">
                    {questions.length} question
                    {questions.length !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Survey Questions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <List className="h-5 w-5" />
            Survey Questions
          </h3>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
              <span className="ml-2 text-gray-600">Loading questions...</span>
            </div>
          ) : questions.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center text-gray-500">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No questions found for this survey</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {questions.map((question, index) => {
                const IconComponent =
                  questionTypeIcons[question.type] || FileText;

                return (
                  <Card
                    key={question.id}
                    className="border-l-4 border-l-teal-500"
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-teal-100 rounded-lg">
                          <IconComponent className="h-4 w-4 text-teal-600" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-gray-500">
                              Question {index + 1}
                            </span>
                            {question.required && (
                              <Badge variant="outline" className="text-xs">
                                Required
                              </Badge>
                            )}
                            <Badge
                              variant="secondary"
                              className="text-xs capitalize"
                            >
                              {question.type.replace("_", " ")}
                            </Badge>
                          </div>

                          <h4 className="font-medium text-gray-900 mb-1">
                            {question.text}
                          </h4>

                          {question.sinhalaText &&
                            question.sinhalaText !== question.text && (
                              <p className="text-sm text-gray-600 mb-2">
                                {question.sinhalaText}
                              </p>
                            )}

                          {renderQuestionOptions(question)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
