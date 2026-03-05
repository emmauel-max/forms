export type QuestionType = 
  | 'short_answer' 
  | 'paragraph' 
  | 'multiple_choice' 
  | 'checkboxes' 
  | 'dropdown'
  | 'date'
  | 'time'
  | 'linear_scale';

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  required: boolean;
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  sections: Section[];
  createdAt: string;
  updatedAt: string;
  responseCount?: number;
}

export interface FormResponse {
  id: string;
  formId: string;
  answers: Record<string, string | string[]>;
  submittedAt: string;
}
