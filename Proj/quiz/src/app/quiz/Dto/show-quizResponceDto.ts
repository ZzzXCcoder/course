export interface ShowQuizResponse {
  items : QuizResponse[];
  totalCount : number;
  pageNumber : number;
  pageSize : number;
  totalPages : number;
  hasPreviousPage : boolean;
  hasNextPage : boolean;
}

export interface QuizResponse {
  id: number;
  name: string;
  description: string;
  items : QuizItemResponse[];
}
export type QuizItemResponse = RangeItemResponse | SelectItemResponse | TextItemResponse

export interface RangeItemResponse {
  title?: string;
  description?: string;
  min: number;
  max: number;
  type: 'range';
  id: number;
  quizId: number;
}
export interface SelectItemResponse {
  title?: string;
  description?: string;
  options: string[];
  type: 'select';
  id: number;
  quizId: number;
}
export interface TextItemResponse {
  title?: string;
  description?: string;
  placeholder: string;
  type: 'text'
  id: number;
  quizId: number;
}
