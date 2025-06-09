export interface ISurvey {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  price: number;
  status: "active" | "completed" | "draft" | "expired";
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  participantCount?: number;
  maxParticipants?: number;
}

export interface SurveyFilters {
  query?: string;
  status?: string;
  page?: number;
  size?: number;
}

export interface SurveyGridProps {
  surveys: Survey[];
  totalSurveys: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface SurveyCardProps {
  survey: Survey;
  onView?: (surveyId: string) => void;
  onEdit?: (surveyId: string) => void;
  onDelete?: (surveyId: string) => void;
  readonly onFillSurvey?: (response: SurveyResponse) => void;
}

export type QuestionType =
  | "single_select"
  | "multi_select"
  | "yes_no"
  | "text"
  | "textarea"
  | "rating"
  | "number";

export const questionTypeOptions = [
  { value: "single_select", label: "Single Select" },
  { value: "multi_select", label: "Multi Select" },
  { value: "yes_no", label: "Yes/No" },
  { value: "text", label: "Short Text" },
  { value: "textarea", label: "Long Text" },
  { value: "rating", label: "Rating (1-5)" },
  { value: "number", label: "Number" },
] as const;

export interface QuestionOption {
  id: string;
  text: string;
  sinhalaText?: string;
}

export interface Question {
  id: string;
  text: string;
  sinhalaText?: string;
  type: QuestionType;
  options: QuestionOption[];
  required: boolean;
  order: number;
}

export interface SurveyForm {
  id?: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Survey extends SurveyForm {
  id: string;
  status: "active" | "completed" | "draft" | "expired";
  dueDate: string;
  dueTime: string;
  price: number;
  isVerified?: boolean;
  isRejected?: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SurveyResponse {
  // id: string;
  surveyId: string;
  responses: Record<string, any>;
  // submittedAt: string;
}

export interface QuestionBuilderProps {
  readonly question: Question;
  readonly questionNumber: number;
  readonly onUpdate: (question: Question) => void;
  readonly onDelete: (questionId: string) => void;
}

export interface OptionBuilderProps {
  readonly option: QuestionOption;
  readonly onUpdate: (option: QuestionOption) => void;
  readonly onDelete: (optionId: string) => void;
  readonly showSinhala: boolean;
}
