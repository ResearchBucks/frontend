"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

interface SurveyFiltersProps {
  totalSurveys: number;
}

export function SurveyFilters({ totalSurveys }: SurveyFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentQuery = searchParams.get("query") || "";
  const currentStatus = searchParams.get("status") || "all";

  const [query, setQuery] = React.useState(currentQuery);
  const [status, setStatus] = React.useState(currentStatus);

  const updateSearchParams = (newQuery: string, newStatus: string) => {
    const params = new URLSearchParams(searchParams);

    if (newQuery) {
      params.set("query", newQuery);
    } else {
      params.delete("query");
    }

    if (newStatus && newStatus !== "all") {
      params.set("status", newStatus);
    } else {
      params.delete("status");
    }

    // Reset to first page when filtering
    params.delete("page");

    router.push(`?${params.toString()}`);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    updateSearchParams(query, newStatus);
  };

  const hasActiveFilters =
    currentQuery || (currentStatus && currentStatus !== "all");

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="flex justify-end gap-2">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div>
          Showing {totalSurveys} survey{totalSurveys !== 1 ? "s" : ""}
          {hasActiveFilters && (
            <span className="ml-1">
              {currentQuery && `matching "${currentQuery}"`}
              {currentQuery && currentStatus !== "all" && " and "}
              {currentStatus !== "all" && `with status "${currentStatus}"`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
