"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SurveyForm } from "@/types/surveys/surveys";
import { SurveyBuilder } from "@/components/admin/surveys/create/survey-builder";

export default function CreateSurveyPage() {
  const router = useRouter();

  const handleSave = (survey: SurveyForm) => {
    console.log("Saving survey:", survey);

    alert("Survey created successfully!");
    router.push("/surveys");
  };

  const handleCancel = () => {
    router.push("/surveys/create");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Survey
          </h1>
          <p className="text-gray-600 mt-2">
            Build your survey by adding questions and configuring their options
          </p>
        </div>

        <SurveyBuilder onSave={handleSave} onCancel={handleCancel} />
      </div>
    </div>
  );
}
