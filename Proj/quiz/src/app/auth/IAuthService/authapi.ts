import {RegisterRequest, LoginRequest} from '../Dto/authDtos';
import {Observable} from 'rxjs';


export interface AuthApi {
  register(data: RegisterRequest): Observable<any>;
  login(data: LoginRequest): Observable<any>;
  logout(): Observable<any>;
  me(): Observable<any>;

}
