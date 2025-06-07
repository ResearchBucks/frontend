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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams(query, status);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    updateSearchParams(query, newStatus);
  };

  const clearFilters = () => {
    setQuery("");
    setStatus("all");
    router.push(window.location.pathname);
  };

  const hasActiveFilters =
    currentQuery || (currentStatus && currentStatus !== "all");

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search surveys by title or description..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" variant="outline">
            Search
          </Button>
        </form>

        <div className="flex gap-2">
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

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="icon"
              onClick={clearFilters}
              title="Clear filters"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
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
