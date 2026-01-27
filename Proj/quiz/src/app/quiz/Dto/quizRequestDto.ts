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
  name: string;
  description: string;
  min: number;
  max: number;
  type: 'range';
}
export interface SelectItemRequest {
  name: string;
  description: string;
  options: string[];
  type: 'select';
}
export interface TextItemRequest {
  name: string;
  description: string;
  placeholder: string;
  type: 'text'
}
export type QuizItemResponse = RangeItemResponse | SelectItemResponse | TextItemResponse

export interface RangeItemResponse {
  name: string;
  description: string;
  min: number;
  max: number;
  type: 'range';
  id: number;
  quizId: number;
}
export interface SelectItemResponse {
  name: string;
  description: string;
  options: string[];
  type: 'select';
  id: number;
  quizId: number;
}
export interface TextItemResponse {
  name: string;
  description: string;
  placeholder: string;
  type: 'text'
  id: number;
  quizId: number;
}

