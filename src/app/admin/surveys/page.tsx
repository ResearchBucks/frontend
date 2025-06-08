import { Metadata } from "next";
import { Survey } from "@/types/surveys/surveys";
import { DataTable } from "@/components/data-table/datatable";
import CustomAxios from "@/app/api/CustomAxios";
import { SurveyColumns } from "@/components/admin/surveys/view/survey-table-colomns";

export const metadata: Metadata = {
  title: "Admin | Surveys",
};

interface GetSurveysResponse {
  surveys: Survey[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

async function getSurveys(): Promise<GetSurveysResponse> {
  try {
    const response = await CustomAxios.get<GetSurveysResponse>(
      `admin/survey/getAllSurveys`
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch surveys:", error);
    throw new Error("Failed to fetch surveys");
  }
}

export default async function SurveysPage() {
  let surveyData: Survey[] = [];
  let tableMessage = "Loading...";
  let pages = 1;

  let response: GetSurveysResponse = {
    surveys: [],
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    },
  };

  try {
    response = await getSurveys();
    surveyData = response.surveys;
    tableMessage = surveyData.length === 0 ? "No surveys found" : "";
    pages = response.pagination.totalPages;
  } catch (error) {
    if (error instanceof Error) {
      tableMessage = "Failed to fetch surveys";
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Surveys Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor all survey research projects
          </p>
        </div>
      </div>

      <DataTable
        tableMessage={tableMessage}
        searchBy=""
        columns={SurveyColumns}
        data={surveyData}
        pageCount={Number(pages)}
        pageIndex={Number(response.pagination.page)}
        pageSize={Number(response.pagination.limit)}
      />
    </div>
  );
}
