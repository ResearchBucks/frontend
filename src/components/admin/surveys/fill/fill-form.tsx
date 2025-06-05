"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Question } from "@/types/surveys/surveys";
import { QuestionField } from "./question-field";

interface SurveyFillFormProps {
  questions: Question[];
  responses: Record<string, any>;
  onResponseChange: (questionId: string, value: any) => void;
  pageNumber: number;
}

export function SurveyFillForm({
  questions,
  responses,
  onResponseChange,
  pageNumber,
}: SurveyFillFormProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Page {pageNumber}
        </h3>
        <p className="text-sm text-gray-600">
          Please answer all required questions to continue
        </p>
      </div>

      {questions.map((question, index) => (
        <Card key={question.id} className="border border-gray-200">
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-sm font-medium">
                  {(pageNumber - 1) * 5 + index + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-base font-medium text-gray-900 mb-1">
                    {question.text}
                    {question.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </h4>
                  {question.sinhalaText && (
                    <p className="text-sm text-gray-600 italic">
                      {question.sinhalaText}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <QuestionField
              question={question}
              value={responses[question.id]}
              onChange={(value) => onResponseChange(question.id, value)}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
