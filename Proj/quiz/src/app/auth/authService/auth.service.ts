import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthApi} from '../IAuthService/authapi';
import {catchError, Observable, of, tap} from "rxjs";
import { RegisterRequest, LoginRequest } from "../Dto/authDtos";
import {environment} from '../../../environment/environment';
import {AuthState} from '../../states/auth-state.service';

@Injectable({providedIn: 'root'})
export class AuthService implements AuthApi {

    private apiUrl = environment.apiUrl+'/auth';
    constructor(private http: HttpClient,
                private authState: AuthState
    ) {

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
    me() {
      return this.http.get(`${this.apiUrl}/me`).pipe(
        tap(() => this.authState.loggedIn.set(true)),
        catchError(() => {
          this.authState.loggedIn.set(false);
          return of(null);
        })
      );
    }
}
