import {Injectable} from '@angular/core';
import {environment} from '../../../environment/environment';
import {HttpClient} from '@angular/common/http';

import {CreateAnswerDto} from '../Dto/createAnswerDto';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class answerQuizService {
  private apiUrl = environment.apiUrl + '/quizzes/';
  constructor(private http: HttpClient) {}
  answerQuiz(createAnswerDto: CreateAnswerDto) : Observable<number> {
    debugger
    return this.http.post<number>(`${this.apiUrl}${createAnswerDto.id}/responses`, createAnswerDto);
  }

}
