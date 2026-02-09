import {Injectable} from '@angular/core';
import {environment} from '../../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QuizApi} from '../IQuizService/quizApi';
import {QuizRequest, QuizResponse} from '../Dto/create-quizRequestDto';
import {showQuizRequest} from '../Dto/show-quizRequest';

@Injectable({providedIn: 'root'})
export class QuizService implements QuizApi {
  private apiUrl = environment.apiUrl + '/quizes';

  constructor(private http: HttpClient) {

  }


  postQuizes(data: QuizRequest): Observable<any> {
    return this.http.post<QuizResponse>(`${this.apiUrl}/`, data);

  }



}
