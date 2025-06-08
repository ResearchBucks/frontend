"use client";

import React from "react";
import { Question } from "@/types/surveys/surveys";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuestionFieldProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  isViewMode?: boolean;
}

export function QuestionField({
  question,
  value,
  onChange,
  isViewMode = false,
}: QuestionFieldProps) {
  const handleMultiSelectChange = (optionId: string, checked: boolean) => {
    if (isViewMode) return;

    const currentValue = Array.isArray(value) ? value : [];
    if (checked) {
      onChange([...currentValue, optionId]);
    } else {
      onChange(currentValue.filter((id: string) => id !== optionId));
    }
  };

  const handleRatingChange = (rating: number) => {
    if (isViewMode) return;
    onChange(rating);
  };

  const getViewModeDisplay = () => {
    if (!isViewMode) return null;

    return (
      <div className="mt-3 p-3 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600 italic">
          Preview mode - interactions disabled
        </p>
      </div>
    );
  };

  switch (question.type) {
    case "single_select":
      return (
        <div className="space-y-3">
          <RadioGroup
            value={value || ""}
            onValueChange={isViewMode ? undefined : onChange}
            className="space-y-2"
          >
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  disabled={isViewMode}
                  className={isViewMode ? "opacity-50" : ""}
                />
                <Label
                  htmlFor={option.id}
                  className={`text-sm ${
                    isViewMode ? "text-gray-500" : "text-gray-700"
                  }`}
                >
                  {option.text}
                  {option.sinhalaText && (
                    <span className="text-gray-500 italic ml-2">
                      ({option.sinhalaText})
                    </span>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {getViewModeDisplay()}
        </div>
      );

    case "multi_select":
      return (
        <div className="space-y-3">
          <div className="space-y-2">
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={Array.isArray(value) && value.includes(option.id)}
                  onCheckedChange={(checked) =>
                    handleMultiSelectChange(option.id, checked as boolean)
                  }
                  disabled={isViewMode}
                  className={isViewMode ? "opacity-50" : ""}
                />
                <Label
                  htmlFor={option.id}
                  className={`text-sm ${
                    isViewMode ? "text-gray-500" : "text-gray-700"
                  }`}
                >
                  {option.text}
                  {option.sinhalaText && (
                    <span className="text-gray-500 italic ml-2">
                      ({option.sinhalaText})
                    </span>
                  )}
                </Label>
              </div>
            ))}
          </div>
          {getViewModeDisplay()}
        </div>
      );

    case "yes_no":
      return (
        <div className="space-y-3">
          <RadioGroup
            value={value || ""}
            onValueChange={isViewMode ? undefined : onChange}
            className="flex space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="yes"
                id="yes"
                disabled={isViewMode}
                className={isViewMode ? "opacity-50" : ""}
              />
              <Label
                htmlFor="yes"
                className={`text-sm ${
                  isViewMode ? "text-gray-500" : "text-gray-700"
                }`}
              >
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="no"
                id="no"
                disabled={isViewMode}
                className={isViewMode ? "opacity-50" : ""}
              />
              <Label
                htmlFor="no"
                className={`text-sm ${
                  isViewMode ? "text-gray-500" : "text-gray-700"
                }`}
              >
                No
              </Label>
            </div>
          </RadioGroup>
          {getViewModeDisplay()}
        </div>
      );

    case "text":
      return (
        <div className="space-y-3">
          <Input
            type="text"
            value={value || ""}
            onChange={(e) => !isViewMode && onChange(e.target.value)}
            placeholder={isViewMode ? "Short text answer" : "Enter your answer"}
            className={`w-full ${
              isViewMode ? "bg-gray-100 text-gray-500" : ""
            }`}
            disabled={isViewMode}
          />
          {getViewModeDisplay()}
        </div>
      );

    case "textarea":
      return (
        <div className="space-y-3">
          <Textarea
            value={value || ""}
            onChange={(e) => !isViewMode && onChange(e.target.value)}
            placeholder={
              isViewMode ? "Long text answer" : "Enter your detailed answer"
            }
            className={`w-full min-h-[100px] ${
              isViewMode ? "bg-gray-100 text-gray-500" : ""
            }`}
            disabled={isViewMode}
          />
          {getViewModeDisplay()}
        </div>
      );

    case "number":
      return (
        <div className="space-y-3">
          <Input
            type="number"
            value={value || ""}
            onChange={(e) => !isViewMode && onChange(e.target.value)}
            placeholder={isViewMode ? "Numeric answer" : "Enter a number"}
            className={`w-full ${
              isViewMode ? "bg-gray-100 text-gray-500" : ""
            }`}
            disabled={isViewMode}
          />
          {getViewModeDisplay()}
        </div>
      );

    case "rating":
      return (
        <div className="space-y-3">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                type="button"
                variant="ghost"
                size="sm"
                className={`p-1 h-auto ${
                  isViewMode ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => handleRatingChange(rating)}
                disabled={isViewMode}
              >
                <Star
                  className={`h-6 w-6 ${
                    value >= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </Button>
            ))}
            <span
              className={`ml-2 text-sm ${
                isViewMode ? "text-gray-500" : "text-gray-600"
              }`}
            >
              {value ? `${value}/5` : "Rate from 1 to 5"}
            </span>
          </div>
          {getViewModeDisplay()}
        </div>
      );

    default:
      return (
        <div className="space-y-3">
          <Input
            type="text"
            value={value || ""}
            onChange={(e) => !isViewMode && onChange(e.target.value)}
            placeholder={isViewMode ? "Text answer" : "Enter your answer"}
            className={`w-full ${
              isViewMode ? "bg-gray-100 text-gray-500" : ""
            }`}
            disabled={isViewMode}
          />
          {getViewModeDisplay()}
        </div>
      );
  }
}
