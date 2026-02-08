import {Injectable, OnInit} from '@angular/core';
import {ShowQuizApi} from '../IQuizService/show-quizApi';
import { Observable } from "rxjs";
import { ShowQuizDto } from "../Dto/show-quizRequestDto";
import { ShowQuizResponse } from "../Dto/show-quizResponceDto";
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environment/environment';

@Injectable({providedIn: 'root'})
export class ShowQuizService implements ShowQuizApi {
  private apiUrl = environment.apiUrl + '/quizes';


  constructor(private http: HttpClient) {}

  showQuizes(showQuizDto: ShowQuizDto): Observable<ShowQuizResponse> {
    return this.http.get<ShowQuizResponse>(this.apiUrl, { params: showQuizDto as any } );
  }


}
