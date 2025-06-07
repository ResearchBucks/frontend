"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import {
  QuestionBuilderProps,
  QuestionOption,
  QuestionType,
  questionTypeOptions,
} from "@/types/surveys/surveys";
import { OptionBuilder } from "./option-builder";
import { Switch } from "@/components/ui/switch";

export function QuestionBuilder({
  question,
  questionNumber,
  onUpdate,
  onDelete,
}: QuestionBuilderProps) {
  const [showSinhalaForQuestion, setShowSinhalaForQuestion] = useState(
    !!question.sinhalaText
  );
  const [showSinhalaForOptions, setShowSinhalaForOptions] = useState(
    question.options.some((opt) => opt.sinhalaText)
  );

  const updateQuestion = (field: keyof typeof question, value: any) => {
    onUpdate({
      ...question,
      [field]: value,
    });
  };

  const handleTypeChange = (newType: QuestionType) => {
    let newOptions = question.options;

    // Auto-create options for certain question types
    if (newType === "yes_no" && question.options.length === 0) {
      newOptions = [
        { id: uuidv4(), text: "Yes", sinhalaText: "" },
        { id: uuidv4(), text: "No", sinhalaText: "" },
      ];
    } else if (newType === "rating" && question.options.length === 0) {
      newOptions = Array.from({ length: 5 }, (_, i) => ({
        id: uuidv4(),
        text: (i + 1).toString(),
        sinhalaText: "",
      }));
    } else if (!needsOptions(newType)) {
      newOptions = [];
    }

    onUpdate({
      ...question,
      type: newType,
      options: newOptions,
    });
  };

  const needsOptions = (type: QuestionType): boolean => {
    return ["single_select", "multi_select", "yes_no", "rating"].includes(type);
  };

  const addOption = () => {
    const newOption: QuestionOption = {
      id: uuidv4(),
      text: "",
      sinhalaText: "",
    };

    updateQuestion("options", [...question.options, newOption]);
  };

  const updateOption = (updatedOption: QuestionOption) => {
    const updatedOptions = question.options.map((opt) =>
      opt.id === updatedOption.id ? updatedOption : opt
    );
    updateQuestion("options", updatedOptions);
  };

  const deleteOption = (optionId: string) => {
    const updatedOptions = question.options.filter(
      (opt) => opt.id !== optionId
    );
    updateQuestion("options", updatedOptions);
  };

  return (
    <Card className="bg-gray-50 border-gray-200">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Question Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Question {questionNumber}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(question.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Question Input and Type */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <Label
                htmlFor={`question-${question.id}`}
                className="text-sm font-medium text-gray-700"
              >
                Question
              </Label>
              <Input
                id={`question-${question.id}`}
                value={question.text}
                onChange={(e) => updateQuestion("text", e.target.value)}
                placeholder="Enter your question"
                className="mt-1 bg-white"
              />

              {showSinhalaForQuestion && (
                <Input
                  value={question.sinhalaText || ""}
                  onChange={(e) =>
                    updateQuestion("sinhalaText", e.target.value)
                  }
                  placeholder="Enter Sinhala translation"
                  className="mt-2 bg-white"
                />
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Option Type
              </Label>
              <Select value={question.type} onValueChange={handleTypeChange}>
                <SelectTrigger className="mt-1 bg-teal-600 text-white border-teal-600 hover:bg-teal-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {questionTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Options Section */}
          {needsOptions(question.type) && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700">
                  Options
                </Label>
                {question.type !== "yes_no" && question.type !== "rating" && (
                  <Button
                    type="button"
                    onClick={addOption}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm"
                    size="sm"
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Add Option
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                {question.options.map((option, index) => (
                  <OptionBuilder
                    key={option.id}
                    option={option}
                    onUpdate={updateOption}
                    onDelete={deleteOption}
                    showSinhala={showSinhalaForOptions}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sinhala Version Button */}
          <div className="flex justify-start">
            <Button
              type="button"
              onClick={() => {
                if (!showSinhalaForQuestion) {
                  setShowSinhalaForQuestion(true);
                  setShowSinhalaForOptions(true);
                } else {
                  setShowSinhalaForQuestion(false);
                  setShowSinhalaForOptions(false);
                  // Clear Sinhala text
                  updateQuestion("sinhalaText", "");
                  const clearedOptions = question.options.map((opt) => ({
                    ...opt,
                    sinhalaText: "",
                  }));
                  updateQuestion("options", clearedOptions);
                }
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              size="sm"
            >
              <Plus className="mr-1 h-3 w-3" />
              {showSinhalaForQuestion ? "Remove" : "Add"} Sinhala Version
            </Button>
          </div>

          {/* Required Toggle */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <Label
              htmlFor={`required-${question.id}`}
              className="text-sm font-medium text-gray-700"
            >
              Required
            </Label>
            <Switch
              id={`required-${question.id}`}
              checked={question.required}
              onCheckedChange={(checked) => updateQuestion("required", checked)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
