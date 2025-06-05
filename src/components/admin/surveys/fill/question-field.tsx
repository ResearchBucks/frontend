"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Question } from "@/types/surveys/surveys";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface QuestionFieldProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
}

export function QuestionField({
  question,
  value,
  onChange,
}: QuestionFieldProps) {
  const renderSingleSelect = () => (
    <RadioGroup
      value={value || ""}
      onValueChange={onChange}
      className="space-y-3"
    >
      {question.options.map((option) => (
        <div key={option.id} className="flex items-center space-x-3">
          <RadioGroupItem value={option.text} id={option.id} />
          <Label htmlFor={option.id} className="flex-1 cursor-pointer">
            <div>
              <span className="text-sm font-medium text-gray-900">
                {option.text}
              </span>
              {option.sinhalaText && (
                <p className="text-xs text-gray-600 italic mt-1">
                  {option.sinhalaText}
                </p>
              )}
            </div>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  const renderMultiSelect = () => {
    const selectedValues = Array.isArray(value) ? value : [];

    const handleCheckboxChange = (optionText: string, checked: boolean) => {
      if (checked) {
        onChange([...selectedValues, optionText]);
      } else {
        onChange(selectedValues.filter((v: string) => v !== optionText));
      }
    };

    return (
      <div className="space-y-3">
        {question.options.map((option) => (
          <div key={option.id} className="flex items-center space-x-3">
            <Checkbox
              id={option.id}
              checked={selectedValues.includes(option.text)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(option.text, checked as boolean)
              }
            />
            <Label htmlFor={option.id} className="flex-1 cursor-pointer">
              <div>
                <span className="text-sm font-medium text-gray-900">
                  {option.text}
                </span>
                {option.sinhalaText && (
                  <p className="text-xs text-gray-600 italic mt-1">
                    {option.sinhalaText}
                  </p>
                )}
              </div>
            </Label>
          </div>
        ))}
      </div>
    );
  };

  const renderYesNo = () => (
    <RadioGroup
      value={value || ""}
      onValueChange={onChange}
      className="flex gap-6"
    >
      {question.options.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <RadioGroupItem value={option.text} id={option.id} />
          <Label htmlFor={option.id} className="cursor-pointer">
            <span className="text-sm font-medium text-gray-900">
              {option.text}
            </span>
            {option.sinhalaText && (
              <span className="text-xs text-gray-600 italic ml-2">
                ({option.sinhalaText})
              </span>
            )}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  const renderText = () => (
    <Input
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your answer"
      className="w-full"
    />
  );

  const renderTextarea = () => (
    <Textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your detailed answer"
      className="w-full min-h-[100px] resize-none"
      rows={4}
    />
  );

  const renderRating = () => {
    const rating = parseInt(value) || 0;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onChange(star.toString())}
              className={`p-2 hover:bg-gray-100 ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              <Star
                className={`h-8 w-8 ${star <= rating ? "fill-current" : ""}`}
              />
            </Button>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 px-2">
          <span>Poor</span>
          <span>Excellent</span>
        </div>
        {rating > 0 && (
          <p className="text-center text-sm text-gray-700">
            You selected: {rating} star{rating !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    );
  };

  const renderNumber = () => (
    <Input
      type="number"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter a number"
      className="w-full"
    />
  );

  switch (question.type) {
    case "single_select":
      return renderSingleSelect();
    case "multi_select":
      return renderMultiSelect();
    case "yes_no":
      return renderYesNo();
    case "text":
      return renderText();
    case "textarea":
      return renderTextarea();
    case "rating":
      return renderRating();
    case "number":
      return renderNumber();
    default:
      return <div className="text-red-500">Unsupported question type</div>;
  }
}
