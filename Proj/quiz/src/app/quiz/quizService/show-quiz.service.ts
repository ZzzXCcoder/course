import {Injectable, OnInit} from '@angular/core';
import {ShowQuizApi} from '../IQuizService/show-quizApi';
import { Observable } from "rxjs";
import { ShowQuizDto } from "../Dto/show-quizesRequestDto";
import { ShowQuizResponse } from "../Dto/show-quizesResponceDto";
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environment/environment';
import {showQuizRequest} from '../Dto/show-quizRequest';
import {QuizResponse} from '../Dto/create-quizRequestDto';
import {QuizResponseModelPagedResult} from '../Dto/show-quizAnswerResponce';

@Injectable({providedIn: 'root'})
export class ShowQuizService implements ShowQuizApi {
  private apiUrl = environment.apiUrl + '/quizes';


  constructor(private http: HttpClient) {}

  showQuizes(showQuizDto: ShowQuizDto): Observable<ShowQuizResponse> {
    return this.http.get<ShowQuizResponse>(this.apiUrl, { params: showQuizDto as any } );
  }
  getQuizById(data : showQuizRequest): Observable<any>{
    return this.http.get<QuizResponse>(`${this.apiUrl}/${data.id}`);
  }
  getQuizAnswersById(quizId:number, pageNumber:number, pageSize: number) : Observable<QuizResponseModelPagedResult>{
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.http.get<QuizResponseModelPagedResult>(environment.apiUrl+'/quizzes/'+ quizId +'/responses', {params});
  }


}
