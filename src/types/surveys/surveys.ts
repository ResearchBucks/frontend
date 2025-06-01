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
  surveys: ISurvey[];
  totalSurveys: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface SurveyCardProps {
  survey: ISurvey;
  onView?: (surveyId: string) => void;
  onEdit?: (surveyId: string) => void;
  onDelete?: (surveyId: string) => void;
}

export type QuestionType =
  | "single_select"
  | "multi_select"
  | "yes_no"
  | "text"
  | "textarea"
  | "rating"
  | "number";

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

export interface QuestionBuilderProps {
  question: Question;
  onUpdate: (question: Question) => void;
  onDelete: (questionId: string) => void;
  questionNumber: number;
}

export interface OptionBuilderProps {
  option: QuestionOption;
  onUpdate: (option: QuestionOption) => void;
  onDelete: (optionId: string) => void;
  showSinhala: boolean;
}

export const questionTypeOptions = [
  { value: "single_select", label: "Single Select" },
  { value: "multi_select", label: "Multi Select" },
  { value: "yes_no", label: "Yes/No" },
  { value: "text", label: "Short Text" },
  { value: "textarea", label: "Long Text" },
  { value: "rating", label: "Rating (1-5)" },
  { value: "number", label: "Number" },
] as const;
