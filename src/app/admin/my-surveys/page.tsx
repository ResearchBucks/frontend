"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SurveyGrid } from "@/components/admin/surveys/survey-grid";
import { Survey, QuestionType } from "@/types/surveys/surveys";
import { useAppSelector } from "@/lib/redux/hooks";
import CustomAxios from "@/app/api/CustomAxios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type GetSurveysResponse = {
  status: string;
  message: string;
  data: any[]; // You might want to create a proper type for the API response
};

export default function SurveysPage() {
  const searchParams = useSearchParams();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get pagination and filter parameters from URL
  const page = parseInt(searchParams.get("page") || "1");
  const size = parseInt(searchParams.get("size") || "12");
  const query = searchParams.get("query") || "";
  const status = searchParams.get("status") || "all";

  // Get researcher ID from Redux store
  const userId = useAppSelector((state) => state.auth.userId);

  // Function to transform API response to Survey type
  const transformApiDataToSurvey = (apiData: any): Survey => {
    return {
      id: apiData.id?.toString() || "",
      title: apiData.title || "",
      description: apiData.description || "",
      dueDate: apiData.expiringDate
        ? new Date(apiData.expiringDate).toISOString().split("T")[0]
        : "",
      dueTime: apiData.expiringDate
        ? new Date(apiData.expiringDate).toLocaleTimeString()
        : "",
      price: apiData.surveyPrice || 0,
      status: mapApiStatusToSurveyStatus(apiData.paymentStatus),
      imageUrl: "/api/placeholder/400/300", // Default placeholder
      createdAt: apiData.createdAt || new Date().toISOString(),
      updatedAt: apiData.updatedAt || new Date().toISOString(),
      questions: transformApiQuestionsToQuestions(
        apiData.surveyQuestionList || []
      ),
    };
  };

  // Function to map API status to Survey status
  const mapApiStatusToSurveyStatus = (
    apiStatus: string
  ): "active" | "completed" | "draft" => {
    switch (apiStatus?.toLowerCase()) {
      case "paid":
        return "active";
      case "pending":
        return "draft";
      case "cancelled":
        return "completed";
      default:
        return "draft";
    }
  };

  // Function to transform API questions to Survey questions
  const transformApiQuestionsToQuestions = (apiQuestions: any[]) => {
    return apiQuestions.map((apiQuestion, index) => ({
      id: apiQuestion.questionId?.toString() || index.toString(),
      text: apiQuestion.questionDetails?.question || "",
      sinhalaText: apiQuestion.questionDetails?.sinQuestion || "",
      type: mapApiQuestionTypeToSurveyType(apiQuestion.questionDetails?.type),
      options: (apiQuestion.questionDetails?.options || []).map(
        (option: any) => ({
          id: option.id || "",
          text: option.text || "",
          sinhalaText: option.sinhalaText || "",
        })
      ),
      required: apiQuestion.questionDetails?.isRequired || false,
      order: index + 1,
    }));
  };

  // Function to map API question type to Survey question type
  const mapApiQuestionTypeToSurveyType = (apiType: string): QuestionType => {
    const typeMapping: { [key: string]: QuestionType } = {
      SINGLE_SELECT: "single_select",
      MULTI_SELECT: "multi_select",
      TEXT: "text",
      TEXTAREA: "textarea",
      YES_NO: "yes_no",
      RATING: "rating",
    };
    return typeMapping[apiType] || "text";
  };

  // Function to fetch surveys from API
  const fetchSurveys = async () => {
    if (!userId) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await CustomAxios.get<GetSurveysResponse>(
        `researcher/survey/getAllSurveys/${userId}`
      );

      if (response.status === 200 && response.data.data) {
        const transformedSurveys = response.data.data.map(
          transformApiDataToSurvey
        );
        setSurveys(transformedSurveys);
      } else {
        setError("Failed to fetch surveys");
        toast.error("Failed to fetch surveys");
      }
    } catch (error: any) {
      console.error("Error fetching surveys:", error);

      if (error.response?.status === 401) {
        setError("Authentication failed. Please log in again.");
        toast.error("Please log in again");
      } else if (error.response?.status === 404) {
        setSurveys([]);
      } else {
        setError("An error occurred while fetching surveys");
        toast.error("Failed to fetch surveys. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, [userId]);

  let filteredSurveys = surveys;

  if (query) {
    filteredSurveys = filteredSurveys.filter(
      (survey) =>
        survey.title.toLowerCase().includes(query.toLowerCase()) ||
        survey.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (status && status !== "all") {
    filteredSurveys = filteredSurveys.filter(
      (survey) => survey.status === status
    );
  }

  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const paginatedSurveys = filteredSurveys.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredSurveys.length / size);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Surveys</h1>
            <p className="text-gray-600 mt-1">
              Manage and track your survey research projects
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center py-12">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
            <span className="text-gray-600">Loading surveys...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error && !surveys.length) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Surveys</h1>
            <p className="text-gray-600 mt-1">
              Manage and track your survey research projects
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchSurveys}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Surveys</h1>
          <p className="text-gray-600 mt-1">
            Manage and track your survey research projects
          </p>
        </div>

        {/* Refresh button */}
        <button
          onClick={fetchSurveys}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm text-teal-600 hover:text-teal-700 border border-teal-600 hover:border-teal-700 rounded-md disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
        </button>
      </div>

      <SurveyGrid
        surveys={paginatedSurveys}
        totalSurveys={filteredSurveys.length}
        currentPage={page}
        totalPages={totalPages}
        pageSize={size}
      />
    </div>
  );
}
