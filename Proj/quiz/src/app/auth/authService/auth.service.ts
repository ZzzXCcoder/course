import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthApi} from '../IAuthService/authapi';
import { Observable } from "rxjs";
import { RegisterRequest, LoginRequest } from "../Dto/authDtos";
import {environment} from '../../../environment/environment';

@Injectable({providedIn: 'root'})
export class AuthService implements AuthApi {

    private apiUrl = environment.apiUrl+'/auth';
    constructor(private http: HttpClient) {

    }
    register(data: RegisterRequest): Observable<any> {
       return this.http.post(`${this.apiUrl}/register`, data);
    }
    login(data: LoginRequest): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, data);
    }
    logout(): Observable<any> {
      return this.http.post(`${this.apiUrl}/logout`,null);
    }
    me(): Observable<any> {
      return this.http.get(`${this.apiUrl}/me`, );
    }
}
