import {ShowQuizDto} from '../Dto/show-quizesRequestDto';
import {Observable} from 'rxjs';
import {ShowQuizResponse} from '../Dto/show-quizesResponceDto';

export interface ShowQuizApi {
  showQuizes(showQuizDto : ShowQuizDto): Observable<ShowQuizResponse>;
}
