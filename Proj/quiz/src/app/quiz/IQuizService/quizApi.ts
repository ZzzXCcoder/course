import {QuizRequest, QuizResponse} from '../Dto/create-quizRequestDto';
import {Observable} from 'rxjs';

export interface QuizApi{
  postQuizes(data: QuizRequest): Observable<any>;
}

