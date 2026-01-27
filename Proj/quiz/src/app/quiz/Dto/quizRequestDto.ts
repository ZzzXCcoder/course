export interface QuizRequest {
  name: string;
  description: string;
  items : QuizItemRequest[];
}
export interface QuizResponse {
  name: string;
  description: string;
  items : QuizItemResponse[];
}


export type QuizItemRequest = RangeItemRequest | SelectItemRequest | TextItemRequest

export interface RangeItemRequest {
  type: 'range';
  title: string;
  description: string;
  min: number;
  max: number;
}
export interface SelectItemRequest {
  type: 'select';
  title: string;
  description: string;
  options: string[];
}
export interface TextItemRequest {
  type: 'text'
  title: string;
  description: string;
  placeholder: string;
}
export type QuizItemResponse = RangeItemResponse | SelectItemResponse | TextItemResponse

export interface RangeItemResponse {
  title: string;
  description: string;
  min: number;
  max: number;
  type: 'range';
  id: number;
  quizId: number;
}
export interface SelectItemResponse {
  title: string;
  description: string;
  options: string[];
  type: 'select';
  id: number;
  quizId: number;
}
export interface TextItemResponse {
  title: string;
  description: string;
  placeholder: string;
  type: 'text'
  id: number;
  quizId: number;
}

