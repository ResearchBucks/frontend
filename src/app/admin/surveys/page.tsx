import { SurveyGrid } from "@/components/admin/surveys/survey-grid";
import { ISurvey } from "@/types/surveys/surveys";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Surveys | Dashboard",
};

// Static data for now
const mockSurveys: ISurvey[] = [
  {
    id: "1",
    title: "Research Name",
    description:
      "This is the place where the research description will be displayed",
    dueDate: "2024-06-09",
    dueTime: "09:00 p.m",
    price: 50.5,
    status: "active",
    imageUrl: "/api/placeholder/400/300",
    createdAt: "2024-05-15T10:00:00Z",
    updatedAt: "2024-05-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Customer Satisfaction Survey",
    description:
      "Help us understand your experience with our products and services",
    dueDate: "2024-06-12",
    dueTime: "11:30 p.m",
    price: 75.0,
    status: "active",
    imageUrl: "/api/placeholder/400/300",
    createdAt: "2024-05-10T14:00:00Z",
    updatedAt: "2024-05-10T14:00:00Z",
  },
  {
    id: "3",
    title: "Market Research Study",
    description:
      "Share your thoughts on emerging market trends and consumer behavior",
    dueDate: "2024-06-08",
    dueTime: "08:45 p.m",
    price: 100.0,
    status: "completed",
    imageUrl: "/api/placeholder/400/300",
    createdAt: "2024-05-05T09:00:00Z",
    updatedAt: "2024-05-20T16:00:00Z",
  },
  {
    id: "4",
    title: "Product Feedback Survey",
    description:
      "Your feedback helps us improve our products for better user experience",
    dueDate: "2024-06-15",
    dueTime: "10:15 p.m",
    price: 25.0,
    status: "draft",
    imageUrl: "/api/placeholder/400/300",
    createdAt: "2024-05-18T11:00:00Z",
    updatedAt: "2024-05-18T11:00:00Z",
  },
  {
    id: "5",
    title: "Healthcare Survey",
    description:
      "Anonymous survey about healthcare experiences and preferences",
    dueDate: "2024-06-20",
    dueTime: "07:00 p.m",
    price: 150.0,
    status: "active",
    imageUrl: "/api/placeholder/400/300",
    createdAt: "2024-05-12T13:00:00Z",
    updatedAt: "2024-05-12T13:00:00Z",
  },
  {
    id: "6",
    title: "Technology Usage Study",
    description:
      "Research on how people interact with modern technology and digital devices",
    dueDate: "2024-06-18",
    dueTime: "09:30 p.m",
    price: 80.0,
    status: "active",
    imageUrl: "/api/placeholder/400/300",
    createdAt: "2024-05-08T15:00:00Z",
    updatedAt: "2024-05-08T15:00:00Z",
  },
];

export default async function SurveysPage(props: {
  searchParams?: Promise<{
    page?: string | undefined;
    size?: string | undefined;
    query?: string | undefined;
    status?: string | undefined;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const status = searchParams?.status || "";
  const page = Number(searchParams?.page || "1");
  const size = Number(searchParams?.size || "12");

  // Filter surveys based on search params
  let filteredSurveys = mockSurveys;

  if (query) {
    filteredSurveys = filteredSurveys.filter(
      (survey) =>
        survey.title.toLowerCase().includes(query.toLowerCase()) ||
        survey.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (status && status !== "all") {
    filteredSurveys = filteredSurveys.filter(
      (survey) => survey.status === status
    );
  }

  // Pagination
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const paginatedSurveys = filteredSurveys.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredSurveys.length / size);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Surveys</h1>
          <p className="text-gray-600 mt-1">
            Manage and track your survey research projects
          </p>
        </div>
      </div>

      <SurveyGrid
        surveys={paginatedSurveys}
        totalSurveys={filteredSurveys.length}
        currentPage={page}
        totalPages={totalPages}
        pageSize={size}
      />
    </div>
  );
}
