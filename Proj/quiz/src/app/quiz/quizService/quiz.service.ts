import {Injectable} from '@angular/core';
import {environment} from '../../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QuizApi} from '../IQuizService/quizApi';
import {QuizRequest, QuizResponse} from '../Dto/quizRequestDto';

@Injectable({providedIn: 'root'})
export class QuizService implements QuizApi {
  private apiUrl = environment.apiUrl + '/quizes';

  constructor(private http: HttpClient) {

  }

  getQuizes(data: QuizResponse): Observable<any> {
        throw new Error("Method not implemented.");
    }
  postQuizes(data: QuizRequest): Observable<any> {
    debugger
    console.log(data);
    console.log(data.items);
    return this.http.post<QuizResponse>(`${this.apiUrl}/`, data);

  }


}
