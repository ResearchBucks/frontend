import { SurveyGrid } from "@/components/admin/surveys/survey-grid";
import { Survey } from "@/types/surveys/surveys";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Surveys | Dashboard",
};

const mockSurveys: Survey[] = [
  {
    id: "1",
    title: "Customer Satisfaction Survey",
    description:
      "Help us understand your experience with our products and services. Your feedback is valuable to us.",
    dueDate: "2024-06-09",
    dueTime: "09:00 p.m",
    price: 50.5,
    status: "active",
    imageUrl: "/api/placeholder/400/300",
    createdAt: "2024-05-15T10:00:00Z",
    updatedAt: "2024-05-15T10:00:00Z",
    questions: [
      {
        id: "q1",
        text: "How would you rate our overall service?",
        sinhalaText: "අපගේ සේවාව සමස්තයක් ලෙස ඔබ කෙසේ ඇගයීමට ලක් කරනවාද?",
        type: "rating",
        options: [
          { id: "r1", text: "1", sinhalaText: "1" },
          { id: "r2", text: "2", sinhalaText: "2" },
          { id: "r3", text: "3", sinhalaText: "3" },
          { id: "r4", text: "4", sinhalaText: "4" },
          { id: "r5", text: "5", sinhalaText: "5" },
        ],
        required: true,
        order: 1,
      },
      {
        id: "q2",
        text: "Which products have you used?",
        sinhalaText: "ඔබ භාවිතා කර ඇති නිෂ්පාදන මොනවාද?",
        type: "multi_select",
        options: [
          { id: "p1", text: "Product A", sinhalaText: "නිෂ්පාදනය A" },
          { id: "p2", text: "Product B", sinhalaText: "නිෂ්පාදනය B" },
          { id: "p3", text: "Product C", sinhalaText: "නිෂ්පාදනය C" },
        ],
        required: true,
        order: 2,
      },
      {
        id: "q3",
        text: "Would you recommend us to others?",
        sinhalaText: "ඔබ අපව අන් අයට නිර්දේශ කරනවාද?",
        type: "yes_no",
        options: [
          { id: "y1", text: "Yes", sinhalaText: "ඔව්" },
          { id: "n1", text: "No", sinhalaText: "නැහැ" },
        ],
        required: true,
        order: 3,
      },
      {
        id: "q4",
        text: "What is your age?",
        sinhalaText: "ඔබේ වයස කීයද?",
        type: "number",
        options: [],
        required: false,
        order: 4,
      },
      {
        id: "q5",
        text: "Please share any additional feedback",
        sinhalaText: "කරුණාකර අමතර ප්‍රතිපෝෂණ බෙදා ගන්න",
        type: "textarea",
        options: [],
        required: false,
        order: 5,
      },
    ],
  },
  {
    id: "2",
    title: "Market Research Study",
    description:
      "Share your thoughts on emerging market trends and consumer behavior patterns in the digital age.",
    dueDate: "2024-06-12",
    dueTime: "11:30 p.m",
    price: 75.0,
    status: "active",
    imageUrl: "/api/placeholder/400/300",
    createdAt: "2024-05-10T14:00:00Z",
    updatedAt: "2024-05-10T14:00:00Z",
    questions: [
      {
        id: "q6",
        text: "What is your primary shopping preference?",
        type: "single_select",
        options: [
          { id: "s1", text: "Online Shopping" },
          { id: "s2", text: "In-store Shopping" },
          { id: "s3", text: "Both Equally" },
          { id: "s4", text: "Neither" },
        ],
        required: true,
        order: 1,
      },
      {
        id: "q7",
        text: "How often do you make online purchases?",
        type: "single_select",
        options: [
          { id: "f1", text: "Daily" },
          { id: "f2", text: "Weekly" },
          { id: "f3", text: "Monthly" },
          { id: "f4", text: "Rarely" },
        ],
        required: true,
        order: 2,
      },
      {
        id: "q8",
        text: "What factors influence your purchasing decisions?",
        type: "multi_select",
        options: [
          { id: "i1", text: "Price" },
          { id: "i2", text: "Quality" },
          { id: "i3", text: "Brand Reputation" },
          { id: "i4", text: "Reviews" },
          { id: "i5", text: "Convenience" },
        ],
        required: true,
        order: 3,
      },
    ],
  },
  {
    id: "3",
    title: "Technology Usage Assessment",
    description:
      "Research on how people interact with modern technology and digital devices in their daily lives.",
    dueDate: "2024-06-08",
    dueTime: "08:45 p.m",
    price: 100.0,
    status: "completed",
    imageUrl: "/api/placeholder/400/300",
    createdAt: "2024-05-05T09:00:00Z",
    updatedAt: "2024-05-20T16:00:00Z",
    questions: [
      {
        id: "q9",
        text: "How many hours per day do you use technology?",
        type: "number",
        options: [],
        required: true,
        order: 1,
      },
      {
        id: "q10",
        text: "Rate your comfort level with new technology",
        type: "rating",
        options: [
          { id: "t1", text: "1" },
          { id: "t2", text: "2" },
          { id: "t3", text: "3" },
          { id: "t4", text: "4" },
          { id: "t5", text: "5" },
        ],
        required: true,
        order: 2,
      },
    ],
  },
  {
    id: "4",
    title: "Product Feedback Survey",
    description:
      "Your feedback helps us improve our products for better user experience and customer satisfaction.",
    dueDate: "2024-06-15",
    dueTime: "10:15 p.m",
    price: 25.0,
    status: "draft",
    imageUrl: "/api/placeholder/400/300",
    createdAt: "2024-05-18T11:00:00Z",
    updatedAt: "2024-05-18T11:00:00Z",
    questions: [
      {
        id: "q11",
        text: "How did you first hear about our product?",
        type: "single_select",
        options: [
          { id: "h1", text: "Social Media" },
          { id: "h2", text: "Search Engine" },
          { id: "h3", text: "Friend/Family" },
          { id: "h4", text: "Advertisement" },
          { id: "h5", text: "Other" },
        ],
        required: true,
        order: 1,
      },
      {
        id: "q12",
        text: "What features do you use most?",
        type: "multi_select",
        options: [
          { id: "fe1", text: "Feature A" },
          { id: "fe2", text: "Feature B" },
          { id: "fe3", text: "Feature C" },
          { id: "fe4", text: "Feature D" },
        ],
        required: false,
        order: 2,
      },
    ],
  },
  {
    id: "5",
    title: "Healthcare Experience Survey",
    description:
      "Anonymous survey about healthcare experiences and preferences to improve medical services.",
    dueDate: "2024-06-20",
    dueTime: "07:00 p.m",
    price: 150.0,
    status: "active",
    imageUrl: "/api/placeholder/400/300",
    createdAt: "2024-05-12T13:00:00Z",
    updatedAt: "2024-05-12T13:00:00Z",
    questions: [
      {
        id: "q13",
        text: "How often do you visit healthcare facilities?",
        type: "single_select",
        options: [
          { id: "v1", text: "Weekly" },
          { id: "v2", text: "Monthly" },
          { id: "v3", text: "Quarterly" },
          { id: "v4", text: "Annually" },
          { id: "v5", text: "Rarely" },
        ],
        required: true,
        order: 1,
      },
      {
        id: "q14",
        text: "Rate your satisfaction with healthcare services",
        type: "rating",
        options: [
          { id: "h1", text: "1" },
          { id: "h2", text: "2" },
          { id: "h3", text: "3" },
          { id: "h4", text: "4" },
          { id: "h5", text: "5" },
        ],
        required: true,
        order: 2,
      },
      {
        id: "q15",
        text: "Do you prefer telemedicine over in-person visits?",
        type: "yes_no",
        options: [
          { id: "tm1", text: "Yes" },
          { id: "tm2", text: "No" },
        ],
        required: false,
        order: 3,
      },
    ],
  },
  {
    id: "6",
    title: "Employee Workplace Survey",
    description:
      "Understanding workplace satisfaction and employee experience to create a better work environment.",
    dueDate: "2024-06-18",
    dueTime: "09:30 p.m",
    price: 80.0,
    status: "active",
    imageUrl: "/api/placeholder/400/300",
    createdAt: "2024-05-08T15:00:00Z",
    updatedAt: "2024-05-08T15:00:00Z",
    questions: [
      {
        id: "q16",
        text: "How satisfied are you with your current role?",
        type: "rating",
        options: [
          { id: "w1", text: "1" },
          { id: "w2", text: "2" },
          { id: "w3", text: "3" },
          { id: "w4", text: "4" },
          { id: "w5", text: "5" },
        ],
        required: true,
        order: 1,
      },
      {
        id: "q17",
        text: "What work arrangements do you prefer?",
        type: "multi_select",
        options: [
          { id: "wa1", text: "Remote Work" },
          { id: "wa2", text: "Office Work" },
          { id: "wa3", text: "Hybrid Model" },
          { id: "wa4", text: "Flexible Hours" },
        ],
        required: true,
        order: 2,
      },
      {
        id: "q18",
        text: "What is your employment status?",
        type: "single_select",
        options: [
          { id: "es1", text: "Full-time" },
          { id: "es2", text: "Part-time" },
          { id: "es3", text: "Contract" },
          { id: "es4", text: "Freelance" },
        ],
        required: true,
        order: 3,
      },
      {
        id: "q19",
        text: "Please share suggestions for workplace improvement",
        type: "textarea",
        options: [],
        required: false,
        order: 4,
      },
      {
        id: "q20",
        text: "Your name (optional)",
        type: "text",
        options: [],
        required: false,
        order: 5,
      },
      {
        id: "q21",
        text: "Years of experience in current field",
        type: "number",
        options: [],
        required: false,
        order: 6,
      },
    ],
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
