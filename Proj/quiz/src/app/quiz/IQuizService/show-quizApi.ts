import {ShowQuizDto} from '../Dto/show-quizRequestDto';
import {Observable} from 'rxjs';
import {ShowQuizResponse} from '../Dto/show-quizResponceDto';

export interface ShowQuizApi {
  showQuizes(showQuizDto : ShowQuizDto): Observable<ShowQuizResponse>;
}
