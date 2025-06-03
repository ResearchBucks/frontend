"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Question, SurveyForm } from "@/types/surveys/surveys";
import { Textarea } from "@/components/ui/textarea";
import { QuestionBuilder } from "./question-builder";

interface SurveyBuilderProps {
  initialData?: SurveyForm;
  onSave?: (survey: SurveyForm) => void;
  onCancel?: () => void;
}

export function SurveyBuilder({
  initialData,
  onSave,
  onCancel,
}: SurveyBuilderProps) {
  const [survey, setSurvey] = useState<SurveyForm>(() => ({
    title: initialData?.title || "",
    description: initialData?.description || "",
    questions: initialData?.questions || [],
  }));

  const updateSurveyInfo = (
    field: keyof Pick<SurveyForm, "title" | "description">,
    value: string
  ) => {
    setSurvey((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const createNewQuestion = (): Question => ({
    id: uuidv4(),
    text: "",
    sinhalaText: "",
    type: "single_select",
    options: [],
    required: false,
    order: survey.questions.length + 1,
  });

  const addQuestion = () => {
    const newQuestion = createNewQuestion();
    setSurvey((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      ),
    }));
  };

  const deleteQuestion = (questionId: string) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
  };

  const handleSubmit = () => {
    if (!survey.title.trim()) {
      alert("Please enter a survey title");
      return;
    }

    if (!survey.description.trim()) {
      alert("Please enter a survey description");
      return;
    }

    if (survey.questions.length === 0) {
      alert("Please add at least one question");
      return;
    }

    // Validate questions
    const invalidQuestions = survey.questions.filter((q) => !q.text.trim());
    if (invalidQuestions.length > 0) {
      alert("Please fill in all question texts");
      return;
    }

    if (onSave) {
      onSave({
        ...survey,
        id: initialData?.id || uuidv4(),
        createdAt: initialData?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Survey Header */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Title
              </Label>
              <Input
                id="title"
                value={survey.title}
                onChange={(e) => updateSurveyInfo("title", e.target.value)}
                placeholder="Enter survey title"
                className="mt-1 bg-white"
              />
            </div>
            <div>
              <Label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Form Description
              </Label>
              <Textarea
                id="description"
                value={survey.description}
                onChange={(e) =>
                  updateSurveyInfo("description", e.target.value)
                }
                placeholder="Enter form description"
                className="mt-1 bg-white resize-none"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <div className="space-y-4">
        {survey.questions.map((question, index) => (
          <QuestionBuilder
            key={question.id}
            question={question}
            questionNumber={index + 1}
            onUpdate={updateQuestion}
            onDelete={deleteQuestion}
          />
        ))}
      </div>

      {/* Add Question Button */}
      <div className="flex justify-center">
        <Button
          onClick={addQuestion}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
