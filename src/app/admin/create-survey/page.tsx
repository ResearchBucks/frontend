"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SurveyForm } from "@/types/surveys/surveys";
import { SurveyBuilder } from "@/components/admin/surveys/create/survey-builder";
import { toast } from "sonner";
import CustomAxios from "@/app/api/CustomAxios";
import { useAppSelector } from "@/lib/redux/hooks";

type CreateSurveyPayload = {
  title: string;
  description: string;
  paymentPerUser: number;
  surveyPrice: number;
  expiringDate: string;
  paymentStatus: "PENDING" | "PAID" | "CANCELLED";
  surveyQuestionList: {
    questionId: number;
    questionDetails: {
      question: string;
      sinQuestion: string;
      isRequired: boolean;
      type:
        | "SINGLE_SELECT"
        | "MULTI_SELECT"
        | "TEXT"
        | "TEXTAREA"
        | "YES_NO"
        | "RATING";
      options: {
        id: string;
        text: string;
        sinhalaText: string;
      }[];
    };
  }[];
};

type CreateSurveyResponse = {
  status: string;
  message: string;
  data: any;
};

export default function CreateSurveyPage() {
  const router = useRouter();

  const userId = useAppSelector((state) => state.auth.userId);
  const accessToken = useAppSelector((state) => state.auth.ACCESSTOKEN);

  console.log("User ID from selector:", userId);
  console.log("Access Token available:", !!accessToken);

  const mapQuestionType = (
    frontendType: string
  ):
    | "SINGLE_SELECT"
    | "MULTI_SELECT"
    | "TEXT"
    | "TEXTAREA"
    | "YES_NO"
    | "RATING" => {
    const typeMapping: {
      [key: string]:
        | "SINGLE_SELECT"
        | "MULTI_SELECT"
        | "TEXT"
        | "TEXTAREA"
        | "YES_NO"
        | "RATING";
    } = {
      single_select: "SINGLE_SELECT",
      multi_select: "MULTI_SELECT",
      text: "TEXT",
      textarea: "TEXTAREA",
      yes_no: "YES_NO",
      rating: "RATING",
    };
    return typeMapping[frontendType] || "SINGLE_SELECT";
  };

  const handleSave = async (survey: SurveyForm) => {
    try {
      if (!userId) {
        toast.error("User ID not found. Please log in again.");
        router.push("/login");
        return;
      }

      if (!accessToken) {
        toast.error("Authentication token not found. Please log in again.");
        router.push("/login");
        return;
      }

      const researcherId = userId;

      const payload: CreateSurveyPayload = {
        title: survey.title,
        description: survey.description,
        paymentPerUser: 0,
        surveyPrice: 0,
        expiringDate: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        paymentStatus: "PENDING",
        surveyQuestionList: survey.questions.map((question, index) => ({
          questionId: index + 1,
          questionDetails: {
            question: question.text,
            sinQuestion: question.sinhalaText || "",
            isRequired: question.required,
            type: mapQuestionType(question.type),
            options: question.options.map((option) => ({
              id: option.id,
              text: option.text,
              sinhalaText: option.sinhalaText || "",
            })),
          },
        })),
      };

      console.log("Saving survey with payload:", payload);
      console.log("Using researcher ID:", researcherId);

      const response = await CustomAxios.post<CreateSurveyResponse>(
        `researcher/survey/create/${researcherId}`,
        payload
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Survey created successfully!");
        router.push("/admin/my-surveys");
      } else {
        toast.error("Failed to create survey. Please try again.");
      }
    } catch (error: any) {
      console.error("Error creating survey:", error);

      if (error.response?.status === 401) {
        toast.error("Authentication failed. Please log in again.");
        router.push("/login");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to create surveys.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "An error occurred while creating the survey. Please try again."
        );
      }
    }
  };

  const handleCancel = () => {
    router.push("/surveys/create");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900">Create New Survey</h3>
          <p className="text-gray-600 text-sm">
            Build your survey by adding questions and configuring their options
          </p>
        </div>

        <SurveyBuilder onSave={handleSave} onCancel={handleCancel} />
      </div>
    </div>
  );
}
