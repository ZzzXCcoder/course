import {QuizRequest, QuizResponse} from '../Dto/quizRequestDto';
import {Observable} from 'rxjs';

export interface QuizApi{
  postQuizes(data: QuizRequest): Observable<any>;
  getQuizes(data: QuizResponse): Observable<any>;
}

