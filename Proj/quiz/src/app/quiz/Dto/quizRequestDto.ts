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
  min: number;
  max: number;
  type: 'range';
}
export interface SelectItemRequest {
  options: string[];
  type: 'select';
}
export interface TextItemRequest {
  placeholder: string;
  type: 'text'
}
export type QuizItemResponse = RangeItemResponse | SelectItemResponse | TextItemResponse

export interface RangeItemResponse {
  min: number;
  max: number;
  type: 'range';
  id: number;
  quizId: number;
}
export interface SelectItemResponse {
  options: string[];
  type: 'select';
  id: number;
  quizId: number;
}
export interface TextItemResponse {
  placeholder: string;
  type: 'text'
  id: number;
  quizId: number;
}

