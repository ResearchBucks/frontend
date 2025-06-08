"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Question } from "@/types/surveys/surveys";
import { QuestionField } from "./question-field";
import { Badge } from "@/components/ui/badge";

interface SurveyFillFormProps {
  questions: Question[];
  responses: Record<string, any>;
  onResponseChange: (questionId: string, value: any) => void;
  pageNumber: number;
  isViewMode?: boolean;
}

export function SurveyFillForm({
  questions,
  responses,
  onResponseChange,
  pageNumber,
  isViewMode = false,
}: SurveyFillFormProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Page {pageNumber}
        </h3>
        <p className="text-sm text-gray-600">
          {isViewMode
            ? "Preview of survey questions and their options"
            : "Please answer all required questions to continue"}
        </p>
      </div>

      {questions.map((question, index) => (
        <Card
          key={question.id}
          className={`border ${
            isViewMode ? "border-blue-200 bg-blue-50/30" : "border-gray-200"
          }`}
        >
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="flex items-start gap-3">
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    isViewMode
                      ? "bg-blue-100 text-blue-700"
                      : "bg-teal-100 text-teal-700"
                  }`}
                >
                  {(pageNumber - 1) * 5 + index + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-base font-medium text-gray-900">
                      {question.text}
                      {question.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </h4>
                    {question.required && (
                      <Badge variant="destructive" className="text-xs">
                        Required
                      </Badge>
                    )}
                  </div>
                  {question.sinhalaText && (
                    <p className="text-sm text-gray-600 italic mt-1">
                      සිංහල: {question.sinhalaText}
                    </p>
                  )}
                  {isViewMode && (
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Type: {question.type.replace("_", " ").toUpperCase()}
                      </Badge>
                      {question.options.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {question.options.length} Options
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <QuestionField
              question={question}
              value={responses[question.id]}
              onChange={(value) => onResponseChange(question.id, value)}
              isViewMode={isViewMode}
            />

            {/* Show options preview in view mode */}
            {isViewMode && question.options.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  Available Options:
                </h5>
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={option.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="w-6 h-6 bg-white border border-gray-300 rounded flex items-center justify-center text-xs font-medium">
                        {optionIndex + 1}
                      </span>
                      <div>
                        <span className="text-gray-900">{option.text}</span>
                        {option.sinhalaText && (
                          <span className="text-gray-600 italic ml-2">
                            ({option.sinhalaText})
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
