export interface QuizResponseModelPagedResult {
  items: QuizResponseModel[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
export interface QuizResponseModel {
  id: number;
  quizId: number;
  userId: number;
  answers: Record<number, any>;
}
