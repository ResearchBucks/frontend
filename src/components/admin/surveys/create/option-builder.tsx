"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { OptionBuilderProps } from "@/types/surveys/surveys";

export function OptionBuilder({
  option,
  onUpdate,
  onDelete,
  showSinhala,
}: OptionBuilderProps) {
  const updateOption = (field: keyof typeof option, value: string) => {
    onUpdate({
      ...option,
      [field]: value,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-300 rounded flex-shrink-0" />
          <Input
            value={option.text}
            onChange={(e) => updateOption("text", e.target.value)}
            placeholder="Option text"
            className="bg-white"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onDelete(option.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {showSinhala && (
          <div className="flex items-center gap-2">
            <div className="w-6 flex-shrink-0" />
            <Input
              value={option.sinhalaText || ""}
              onChange={(e) => updateOption("sinhalaText", e.target.value)}
              placeholder="Sinhala translation"
              className="bg-white"
            />
            <div className="w-10 flex-shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
}
