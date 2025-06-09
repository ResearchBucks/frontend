"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  FileText,
  BarChart3,
  Activity,
  Target,
  CheckCircle,
} from "lucide-react";
import CustomAxios from "@/app/api/CustomAxios";
import MetricCard from "@/components/admin/dashboard/metric-card";
import DashboardBarChart from "@/components/admin/dashboard/bar-chart";
import { useAppSelector } from "@/lib/redux/hooks";

// Enums
export enum UserRoles {
  ADMIN = "ROLE_ADMIN",
  SUPER_ADMIN = "ROLE_SUPER_ADMIN",
  RESEARCHER = "ROLE_RESEARCHER",
  RESPONDENT = "ROLE_RESPONDENT",
}

// Type definitions
interface DashboardData {
  researcherCount: number;
  respondentCount: number;
  surveyCount: number;
  completedSurveys?: number;
  activeSurveys?: number;
  responsesCount?: number;
}

interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
}

interface ApiResponse<T> {
  data?: T;
  count?: number;
  success?: boolean;
  message?: string;
}

// API Service Class
class DashboardApiService {
  // Admin/Super Admin API calls
  static async getResearchers(): Promise<number> {
    try {
      const response = await CustomAxios.get<ApiResponse<any[]>>(
        "/admin/user/getAllResearchers"
      );

      // Handle different response structures
      if (Array.isArray(response.data)) {
        return response.data.length;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        return response.data.data.length;
      } else if (response.data?.count) {
        return response.data.count;
      }

      return 0;
    } catch (error) {
      console.log("Error fetching researchers:", error);
      throw new Error("Failed to fetch researchers count");
    }
  }

  static async getRespondents(): Promise<number> {
    try {
      const response = await CustomAxios.get<ApiResponse<any[]>>(
        "/admin/user/getAllRespondents"
      );

      if (Array.isArray(response.data)) {
        return response.data.length;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        return response.data.data.length;
      } else if (response.data?.count) {
        return response.data.count;
      }

      return 0;
    } catch (error) {
      console.log("Error fetching respondents:", error);
      throw new Error("Failed to fetch respondents count");
    }
  }

  static async getAllSurveys(): Promise<{
    total: number;
    active: number;
    completed: number;
  }> {
    try {
      const response = await CustomAxios.get<ApiResponse<any[]>>(
        "/admin/survey/getAllSurveys"
      );

      let surveys: any[] = [];

      if (Array.isArray(response.data)) {
        surveys = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        surveys = response.data.data;
      }

      const total = surveys.length;
      const active = surveys.filter(
        (survey) => survey.status === "active" || survey.status === "ACTIVE"
      ).length;
      const completed = surveys.filter(
        (survey) =>
          survey.status === "completed" || survey.status === "COMPLETED"
      ).length;

      return { total, active, completed };
    } catch (error) {
      console.log("Error fetching surveys:", error);
      throw new Error("Failed to fetch surveys data");
    }
  }

  // Researcher API calls
  static async getResearcherSurveys(researcherId: string): Promise<{
    total: number;
    active: number;
    completed: number;
    responses: number;
  }> {
    try {
      const response = await CustomAxios.get<ApiResponse<any[]>>(
        `/researcher/survey/getAllSurveys/${researcherId}`
      );

      let surveys: any[] = [];

      if (Array.isArray(response.data)) {
        surveys = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        surveys = response.data.data;
      }

      const total = surveys.length;
      const active = surveys.filter(
        (survey) => survey.status === "active" || survey.status === "ACTIVE"
      ).length;
      const completed = surveys.filter(
        (survey) =>
          survey.status === "completed" || survey.status === "COMPLETED"
      ).length;
      const responses = surveys.reduce(
        (acc, survey) =>
          acc + (survey.responseCount || survey.responses?.length || 0),
        0
      );

      return { total, active, completed, responses };
    } catch (error) {
      console.log("Error fetching researcher surveys:", error);
      throw new Error("Failed to fetch researcher surveys data");
    }
  }

  // Respondent API calls (you may need to adjust endpoints based on your API)
  static async getRespondentData(respondentId: string): Promise<{
    participated: number;
    completed: number;
    responses: number;
  }> {
    try {
      // Option 1: If you have a specific endpoint
      const response = await CustomAxios.get<ApiResponse<any>>(
        `/respondent/surveys/participated/${respondentId}`
      );

      return {
        participated: 0,
        completed: 0,
        responses: 0,
      };
    } catch (error) {
      console.log("Error fetching respondent data:", error);

      // Option 2: Fallback - try to get data from other endpoints
      try {
        const [participatedRes, responsesRes] = await Promise.allSettled([
          CustomAxios.get(`/respondent/surveys/${respondentId}`),
          CustomAxios.get(`/respondent/responses/${respondentId}`),
        ]);

        let participated = 0;
        let completed = 0;
        let responses = 0;

        if (participatedRes.status === "fulfilled") {
          const surveys =
            participatedRes.value.data?.data ||
            participatedRes.value.data ||
            [];
          participated = Array.isArray(surveys) ? surveys.length : 0;
          completed = Array.isArray(surveys)
            ? surveys.filter((s: any) => s.status === "completed").length
            : 0;
        }

        if (responsesRes.status === "fulfilled") {
          const responseData =
            responsesRes.value.data?.data || responsesRes.value.data || [];
          responses = Array.isArray(responseData) ? responseData.length : 0;
        }

        return { participated, completed, responses };
      } catch (fallbackError) {
        console.log("Fallback API calls also failed:", fallbackError);
        return { participated: 0, completed: 0, responses: 0 };
      }
    }
  }
}

// Main Dashboard Component
const AdminDashboardOverview: React.FC = () => {
  const userRole = useAppSelector((state: any) => state.auth.userRole);
  const userId = useAppSelector((state: any) => state.auth.userId);

  const [dashboardData, setDashboardData] = useState<DashboardData>({
    researcherCount: 0,
    respondentCount: 0,
    surveyCount: 0,
    completedSurveys: 0,
    activeSurveys: 0,
    responsesCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data based on user role
  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let data: Partial<DashboardData> = {};

      switch (userRole) {
        case UserRoles.ADMIN:
        case UserRoles.SUPER_ADMIN:
          {
            // Parallel API calls for better performance
            const [researcherCount, respondentCount, surveyData] =
              await Promise.all([
                DashboardApiService.getResearchers(),
                DashboardApiService.getRespondents(),
                DashboardApiService.getAllSurveys(),
              ]);

            data = {
              researcherCount,
              respondentCount,
              surveyCount: surveyData.total,
              activeSurveys: surveyData.active,
              completedSurveys: surveyData.completed,
            };
          }
          break;

        case UserRoles.RESEARCHER:
          {
            if (!userId) throw new Error("User ID not found");

            const surveyData = await DashboardApiService.getResearcherSurveys(
              userId
            );

            data = {
              surveyCount: surveyData.total,
              activeSurveys: surveyData.active,
              completedSurveys: surveyData.completed,
              responsesCount: surveyData.responses,
            };
          }
          break;

        case UserRoles.RESPONDENT:
          {
            if (!userId) throw new Error("User ID not found");

            const respondentData = await DashboardApiService.getRespondentData(
              userId
            );

            data = {
              surveyCount: respondentData.participated,
              completedSurveys: respondentData.completed,
              responsesCount: respondentData.responses,
            };
          }
          break;

        default:
          throw new Error("Invalid user role");
      }

      setDashboardData((prev) => ({ ...prev, ...data }));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch dashboard data";
      setError(errorMessage);
      console.log("Dashboard data fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to fetch data when component mounts or dependencies change
  useEffect(() => {
    if (
      userRole &&
      (userRole === UserRoles.ADMIN ||
        userRole === UserRoles.SUPER_ADMIN ||
        userId)
    ) {
      fetchDashboardData();
    }
  }, [userRole, userId]);

  // Retry function for error state
  const handleRetry = () => {
    fetchDashboardData();
  };

  // Generate metric cards based on user role
  const getMetricCards = () => {
    switch (userRole) {
      case UserRoles.ADMIN:
      case UserRoles.SUPER_ADMIN:
        return [
          {
            title: "Total Researchers",
            value: dashboardData.researcherCount,
            icon: <Users className="w-6 h-6" />,
            color: "blue" as const,
          },
          {
            title: "Total Respondents",
            value: dashboardData.respondentCount,
            icon: <UserCheck className="w-6 h-6" />,
            color: "green" as const,
          },
          {
            title: "Total Surveys",
            value: dashboardData.surveyCount,
            icon: <FileText className="w-6 h-6" />,
            color: "purple" as const,
          },
          {
            title: "Active Surveys",
            value: dashboardData.activeSurveys || 0,
            icon: <Activity className="w-6 h-6" />,
            color: "orange" as const,
          },
        ];

      case UserRoles.RESEARCHER:
        return [
          {
            title: "My Surveys",
            value: dashboardData.surveyCount,
            icon: <FileText className="w-6 h-6" />,
            color: "blue" as const,
          },
          {
            title: "Active Surveys",
            value: dashboardData.activeSurveys || 0,
            icon: <Activity className="w-6 h-6" />,
            color: "green" as const,
          },
          {
            title: "Completed Surveys",
            value: dashboardData.completedSurveys || 0,
            icon: <CheckCircle className="w-6 h-6" />,
            color: "purple" as const,
          },
          {
            title: "Total Responses",
            value: dashboardData.responsesCount || 0,
            icon: <BarChart3 className="w-6 h-6" />,
            color: "orange" as const,
          },
        ];

      case UserRoles.RESPONDENT:
        return [
          {
            title: "Participated Surveys",
            value: dashboardData.surveyCount,
            icon: <Target className="w-6 h-6" />,
            color: "blue" as const,
          },
          {
            title: "Completed Surveys",
            value: dashboardData.completedSurveys || 0,
            icon: <CheckCircle className="w-6 h-6" />,
            color: "green" as const,
          },
          {
            title: "Total Responses",
            value: dashboardData.responsesCount || 0,
            icon: <BarChart3 className="w-6 h-6" />,
            color: "purple" as const,
          },
        ];

      default:
        return [];
    }
  };

  // Generate chart data based on user role
  const getChartData = (): {
    data: ChartDataPoint[];
    title: string;
    description: string;
  } => {
    switch (userRole) {
      case UserRoles.ADMIN:
      case UserRoles.SUPER_ADMIN:
        return {
          data: [
            { name: "Researchers", value: dashboardData.researcherCount },
            { name: "Respondents", value: dashboardData.respondentCount },
            { name: "Total Surveys", value: dashboardData.surveyCount },
            { name: "Active Surveys", value: dashboardData.activeSurveys || 0 },
          ],
          title: "Platform Overview",
          description: "Overview of users and surveys on the platform",
        };

      case UserRoles.RESEARCHER:
        return {
          data: [
            { name: "Total Surveys", value: dashboardData.surveyCount },
            { name: "Active", value: dashboardData.activeSurveys || 0 },
            { name: "Completed", value: dashboardData.completedSurveys || 0 },
            { name: "Responses", value: dashboardData.responsesCount || 0 },
          ],
          title: "My Survey Analytics",
          description: "Overview of your survey performance and responses",
        };

      case UserRoles.RESPONDENT:
        return {
          data: [
            { name: "Participated", value: dashboardData.surveyCount },
            { name: "Completed", value: dashboardData.completedSurveys || 0 },
            {
              name: "Responses Given",
              value: dashboardData.responsesCount || 0,
            },
          ],
          title: "My Participation",
          description: "Overview of your survey participation and activity",
        };

      default:
        return {
          data: [],
          title: "Dashboard",
          description: "No data available",
        };
    }
  };

  const metricCards = getMetricCards();
  const chartData = getChartData();

  // Error state
  if (error) {
    return (
      <div className="w-full p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-semibold mb-2">
            Error Loading Dashboard
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-slate-600">
          {userRole === UserRoles.ADMIN || userRole === UserRoles.SUPER_ADMIN
            ? "Monitor platform activity and user engagement"
            : userRole === UserRoles.RESEARCHER
            ? "Track your survey performance and responses"
            : "View your survey participation and activity"}
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metricCards.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            color={metric.color}
            isLoading={isLoading}
          />
        ))}
      </div>

      {/* Bar Chart */}
      <div className="grid grid-cols-1 gap-6">
        <DashboardBarChart
          data={chartData.data}
          title={chartData.title}
          description={chartData.description}
          isLoading={isLoading}
        />
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end">
        <button
          onClick={handleRetry}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardOverview;
