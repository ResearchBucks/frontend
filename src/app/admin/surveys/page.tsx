"use client";

import { useState, useEffect, useMemo } from "react";
import { Survey } from "@/types/surveys/surveys";
import { DataTable } from "@/components/data-table/datatable";
import CustomAxios from "@/app/api/CustomAxios";
import { SurveyColumns } from "@/components/admin/surveys/view/survey-table-colomns";
import { toast } from "sonner";
import { FileText } from "lucide-react";

// API response interface
interface ApiSurveyData {
  id: number;
  title: string;
  createdDate: string;
  expiringDate: string;
  lastEditedDate: string | null;
  isDeleted: boolean;
  paymentStatus: string;
  isVerified: boolean;
  paymentPerUser: number;
  surveyPrice: number;
  remainingAmountToPay: number;
  paidDate: string;
  approvedDate: string | null;
  description: string;
  isRejected: boolean;
  researcher: {
    id: number;
    firstName: string;
    lastName: string;
    occupation: string;
    email: string;
    mobile: string;
    nic: string;
    address: string;
    createdDate: string;
    isDeleted: boolean;
    isVerified: boolean;
    isLocked: boolean;
    role: string;
  };
}

interface ApiResponse {
  status: string;
  message: string;
  data: ApiSurveyData[];
}

// Frontend pagination interface
interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function SurveysPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Raw data state (all data from API)
  const [allSurveyData, setAllSurveyData] = useState<Survey[]>([]);

  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  // Helper function to map API data to Survey interface
  const mapApiDataToSurvey = (apiData: ApiSurveyData[]): Survey[] => {
    return apiData.map((item) => ({
      id: item.id.toString(), // Convert to string as per interface
      title: item.title,
      description: item.description,
      status: getStatusFromApiData(item) as
        | "active"
        | "completed"
        | "draft"
        | "expired",
      price: item.surveyPrice,
      isVerified: item.isVerified,
      isRejected: item.isRejected,
      dueDate: item.expiringDate,
      dueTime: "", // API doesn't provide separate time field
      questions: [], // API doesn't provide questions in list view
      createdAt: item.createdDate,
      updatedAt: item.lastEditedDate || item.createdDate,
      imageUrl: undefined, // API doesn't provide image URL
      // Additional fields that might be useful for admin view
      participantCount: 0, // Would need separate API call
      maxParticipants: undefined,
    }));
  };

  // Helper function to determine status from API data
  const getStatusFromApiData = (item: ApiSurveyData): string => {
    if (item.isRejected) return "expired";
    if (item.isVerified && item.paymentStatus === "COMPLETED")
      return "completed";
    if (item.isVerified && item.paymentStatus === "PENDING") return "active";
    return "draft";
  };
  const calculatePagination = (
    totalItems: number,
    currentPage: number,
    limit: number
  ): PaginationState => {
    const totalPages = Math.ceil(totalItems / limit);
    return {
      total: totalItems,
      page: currentPage,
      limit,
      totalPages,
    };
  };

  // Helper function to get paginated data
  const getPaginatedData = (
    data: Survey[],
    page: number,
    limit: number
  ): Survey[] => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return data.slice(startIndex, endIndex);
  };

  // Memoized paginated data
  const paginatedSurveyData = useMemo(() => {
    return getPaginatedData(allSurveyData, pagination.page, pagination.limit);
  }, [allSurveyData, pagination.page, pagination.limit]);

  // Fetch surveys function
  const fetchSurveys = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await CustomAxios.get<ApiResponse>(
        "/admin/survey/getAllSurveys"
      );

      if (response.status === 200 && response.data) {
        const apiSurveys = response.data.data || [];
        const mappedSurveys = mapApiDataToSurvey(apiSurveys);
        setAllSurveyData(mappedSurveys);

        // Calculate pagination for current page
        const newPagination = calculatePagination(
          mappedSurveys.length,
          pagination.page,
          pagination.limit
        );
        setPagination(newPagination);

        console.log("Fetched surveys:", mappedSurveys);
      }
    } catch (error: any) {
      console.log("Error fetching surveys:", error);
      setError("Failed to fetch surveys");
      toast.error("Failed to load surveys");
    } finally {
      setLoading(false);
    }
  };

  // Handle pagination changes
  const handlePaginationChange = (page: number) => {
    const newPagination = calculatePagination(
      allSurveyData.length,
      page,
      pagination.limit
    );
    setPagination(newPagination);
  };

  // Load data on component mount
  useEffect(() => {
    fetchSurveys();
  }, []);

  // Determine table message
  const getTableMessage = () => {
    if (loading) return "Loading...";
    if (error) return error;
    if (allSurveyData.length === 0) return "No surveys found";
    return "";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Surveys Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and monitor all survey research projects
            </p>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        tableMessage={getTableMessage()}
        searchBy=""
        columns={SurveyColumns}
        data={paginatedSurveyData}
        pageCount={pagination.totalPages}
        pageIndex={pagination.page - 1} // DataTable expects 0-based index
        pageSize={pagination.limit}
        useFrontendPagination={true}
        onPaginationChange={(updater) => {
          if (typeof updater === "function") {
            const newState = updater({
              pageIndex: pagination.page - 1,
              pageSize: pagination.limit,
            });
            handlePaginationChange(newState.pageIndex + 1); // Convert back to 1-based
          } else {
            handlePaginationChange(updater.pageIndex + 1); // Convert back to 1-based
          }
        }}
        onPageSizeChange={(newSize) => {
          const newPagination = calculatePagination(
            allSurveyData.length,
            1,
            newSize
          );
          setPagination(newPagination);
        }}
      />
    </div>
  );
}
