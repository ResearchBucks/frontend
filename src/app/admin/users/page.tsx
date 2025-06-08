"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Users, UserCheck, UserCog } from "lucide-react";
import { DataTable } from "@/components/data-table/datatable";
import { AdminColumns } from "@/components/admin/users/admin-columns";
import CustomAxios from "@/app/api/CustomAxios";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResearcherColumns } from "@/components/admin/users/researcher-columns";
import { RespondentColumns } from "@/components/admin/users/respondent-columns";
import { CreateUserDialog } from "@/components/admin/users/user-create";
import { AdminUser, ResearcherUser, RespondentUser } from "@/types/user/users";

// Updated API response interfaces
interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}

// Frontend pagination interface
interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState("admin");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Raw data states (all data from API)
  const [allAdminData, setAllAdminData] = useState<AdminUser[]>([]);
  const [allResearcherData, setAllResearcherData] = useState<ResearcherUser[]>(
    []
  );
  const [allRespondentData, setAllRespondentData] = useState<RespondentUser[]>(
    []
  );

  // Pagination states
  const [adminPagination, setAdminPagination] = useState<PaginationState>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [researcherPagination, setResearcherPagination] =
    useState<PaginationState>({
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    });
  const [respondentPagination, setRespondentPagination] =
    useState<PaginationState>({
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    });

  // Error states
  const [adminError, setAdminError] = useState("");
  const [researcherError, setResearcherError] = useState("");
  const [respondentError, setRespondentError] = useState("");

  // Helper function to calculate pagination
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
  const getPaginatedData = <T,>(
    data: T[],
    page: number,
    limit: number
  ): T[] => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return data.slice(startIndex, endIndex);
  };

  // Memoized paginated data
  const paginatedAdminData = useMemo(() => {
    return getPaginatedData(
      allAdminData,
      adminPagination.page,
      adminPagination.limit
    );
  }, [allAdminData, adminPagination.page, adminPagination.limit]);

  const paginatedResearcherData = useMemo(() => {
    return getPaginatedData(
      allResearcherData,
      researcherPagination.page,
      researcherPagination.limit
    );
  }, [
    allResearcherData,
    researcherPagination.page,
    researcherPagination.limit,
  ]);

  const paginatedRespondentData = useMemo(() => {
    return getPaginatedData(
      allRespondentData,
      respondentPagination.page,
      respondentPagination.limit
    );
  }, [
    allRespondentData,
    respondentPagination.page,
    respondentPagination.limit,
  ]);

  // Fetch functions
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setAdminError("");
      const response = await CustomAxios.get<ApiResponse<AdminUser>>(
        "/admin/admin-panel/getAllAdmins"
      );

      if (response.status === 200 && response.data) {
        const admins = response.data.data || [];
        setAllAdminData(admins);

        // Calculate pagination for current page
        const pagination = calculatePagination(
          admins.length,
          adminPagination.page,
          adminPagination.limit
        );
        setAdminPagination(pagination);
      }
    } catch (error: any) {
      console.error("Error fetching admins:", error);
      setAdminError("Failed to fetch admin users");
      toast.error("Failed to load admin users");
    } finally {
      setLoading(false);
    }
  };

  const fetchResearchers = async () => {
    try {
      setLoading(true);
      setResearcherError("");
      const response = await CustomAxios.get<ApiResponse<ResearcherUser>>(
        "/admin/user/getAllResearchers"
      );

      if (response.status === 200 && response.data) {
        const researchers = response.data.data || [];
        setAllResearcherData(researchers);

        // Calculate pagination for current page
        const pagination = calculatePagination(
          researchers.length,
          researcherPagination.page,
          researcherPagination.limit
        );
        setResearcherPagination(pagination);
      }
    } catch (error: any) {
      console.error("Error fetching researchers:", error);
      setResearcherError("Failed to fetch researcher users");
      toast.error("Failed to load researcher users");
    } finally {
      setLoading(false);
    }
  };

  const fetchRespondents = async () => {
    try {
      setLoading(true);
      setRespondentError("");
      const response = await CustomAxios.get<ApiResponse<RespondentUser>>(
        "/admin/user/getAllRespondents"
      );

      if (response.status === 200 && response.data) {
        const respondents = response.data.data || [];
        setAllRespondentData(respondents);

        // Calculate pagination for current page
        const pagination = calculatePagination(
          respondents.length,
          respondentPagination.page,
          respondentPagination.limit
        );
        setRespondentPagination(pagination);
      }
    } catch (error: any) {
      console.error("Error fetching respondents:", error);
      setRespondentError("Failed to fetch respondent users");
      toast.error("Failed to load respondent users");
    } finally {
      setLoading(false);
    }
  };

  // Handle pagination changes
  const handleAdminPaginationChange = (page: number) => {
    const newPagination = calculatePagination(
      allAdminData.length,
      page,
      adminPagination.limit
    );
    setAdminPagination(newPagination);
  };

  const handleResearcherPaginationChange = (page: number) => {
    const newPagination = calculatePagination(
      allResearcherData.length,
      page,
      researcherPagination.limit
    );
    setResearcherPagination(newPagination);
  };

  const handleRespondentPaginationChange = (page: number) => {
    const newPagination = calculatePagination(
      allRespondentData.length,
      page,
      respondentPagination.limit
    );
    setRespondentPagination(newPagination);
  };

  // Load data based on active tab
  useEffect(() => {
    switch (activeTab) {
      case "admin":
        if (allAdminData.length === 0) fetchAdmins();
        break;
      case "researcher":
        if (allResearcherData.length === 0) fetchResearchers();
        break;
      case "respondent":
        if (allRespondentData.length === 0) fetchRespondents();
        break;
    }
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleCreateUser = () => {
    setIsCreateDialogOpen(true);
  };

  const handleUserCreated = () => {
    // Refresh the current tab data and reset pagination to page 1
    switch (activeTab) {
      case "admin":
        setAdminPagination((prev) => ({ ...prev, page: 1 }));
        fetchAdmins();
        break;
      case "researcher":
        setResearcherPagination((prev) => ({ ...prev, page: 1 }));
        fetchResearchers();
        break;
      case "respondent":
        setRespondentPagination((prev) => ({ ...prev, page: 1 }));
        fetchRespondents();
        break;
    }
    setIsCreateDialogOpen(false);
    toast.success("User created successfully");
  };

  const getTabConfig = () => {
    switch (activeTab) {
      case "admin":
        return {
          title: "Admin Users",
          description: "Manage system administrators",
          icon: UserCog,
          count: adminPagination?.total || 0,
        };
      case "researcher":
        return {
          title: "Researchers",
          description: "Manage research professionals",
          icon: Users,
          count: researcherPagination.total,
        };
      case "respondent":
        return {
          title: "Respondents",
          description: "Manage survey participants",
          icon: UserCheck,
          count: respondentPagination.total,
        };
      default:
        return {
          title: "Users",
          description: "Manage users",
          icon: Users,
          count: 0,
        };
    }
  };

  const tabConfig = getTabConfig();
  const IconComponent = tabConfig.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <IconComponent className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage system users across different roles
            </p>
          </div>
        </div>

        {/* Create User Button - Only show for admin tab */}
        {activeTab === "admin" && (
          <Button
            onClick={handleCreateUser}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create User
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="admin" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            <span className="hidden sm:inline">Admin</span>
            <span className="sm:hidden">A</span>
          </TabsTrigger>
          <TabsTrigger value="researcher" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Researchers</span>
            <span className="sm:hidden">R</span>
          </TabsTrigger>
          <TabsTrigger value="respondent" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Respondents</span>
            <span className="sm:hidden">P</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="admin" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {tabConfig.title}
              </h2>
              <p className="text-sm text-gray-600">{tabConfig.description}</p>
            </div>
          </div>

          <DataTable
            tableMessage={adminError || (loading ? "Loading..." : "")}
            searchBy=""
            columns={AdminColumns}
            data={paginatedAdminData}
            pageCount={adminPagination.totalPages}
            pageIndex={adminPagination.page - 1} // DataTable expects 0-based index
            pageSize={adminPagination.limit}
            useFrontendPagination={true}
            onPaginationChange={(updater) => {
              if (typeof updater === "function") {
                const newState = updater({
                  pageIndex: adminPagination.page - 1,
                  pageSize: adminPagination.limit,
                });
                handleAdminPaginationChange(newState.pageIndex + 1); // Convert back to 1-based
              } else {
                handleAdminPaginationChange(updater.pageIndex + 1); // Convert back to 1-based
              }
            }}
            onPageSizeChange={(newSize) => {
              const newPagination = calculatePagination(
                allAdminData.length,
                1,
                newSize
              );
              setAdminPagination(newPagination);
            }}
          />
        </TabsContent>

        <TabsContent value="researcher" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {tabConfig.title}
              </h2>
              <p className="text-sm text-gray-600">{tabConfig.description}</p>
            </div>
          </div>

          <DataTable
            tableMessage={researcherError || (loading ? "Loading..." : "")}
            searchBy=""
            columns={ResearcherColumns}
            data={paginatedResearcherData}
            pageCount={researcherPagination.totalPages}
            pageIndex={researcherPagination.page - 1} // DataTable expects 0-based index
            pageSize={researcherPagination.limit}
            useFrontendPagination={true}
            onPaginationChange={(updater) => {
              if (typeof updater === "function") {
                const newState = updater({
                  pageIndex: researcherPagination.page - 1,
                  pageSize: researcherPagination.limit,
                });
                handleResearcherPaginationChange(newState.pageIndex + 1); // Convert back to 1-based
              } else {
                handleResearcherPaginationChange(updater.pageIndex + 1); // Convert back to 1-based
              }
            }}
            onPageSizeChange={(newSize) => {
              const newPagination = calculatePagination(
                allResearcherData.length,
                1,
                newSize
              );
              setResearcherPagination(newPagination);
            }}
          />
        </TabsContent>

        <TabsContent value="respondent" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {tabConfig.title}
              </h2>
              <p className="text-sm text-gray-600">{tabConfig.description}</p>
            </div>
          </div>

          <DataTable
            tableMessage={respondentError || (loading ? "Loading..." : "")}
            searchBy=""
            columns={RespondentColumns}
            data={paginatedRespondentData}
            pageCount={respondentPagination.totalPages}
            pageIndex={respondentPagination.page - 1} // DataTable expects 0-based index
            pageSize={respondentPagination.limit}
            useFrontendPagination={true}
            onPaginationChange={(updater: any) => {
              if (typeof updater === "function") {
                const newState = updater({
                  pageIndex: respondentPagination.page - 1,
                  pageSize: respondentPagination.limit,
                });
                handleRespondentPaginationChange(newState.pageIndex + 1); // Convert back to 1-based
              } else {
                handleRespondentPaginationChange(updater.pageIndex + 1); // Convert back to 1-based
              }
            }}
            onPageSizeChange={(newSize: any) => {
              const newPagination = calculatePagination(
                allRespondentData.length,
                1,
                newSize
              );
              setRespondentPagination(newPagination);
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Create User Dialog */}
      <CreateUserDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={handleUserCreated}
      />
    </div>
  );
}
