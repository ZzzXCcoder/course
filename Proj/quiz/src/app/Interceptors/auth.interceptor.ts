import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthState} from '../states/auth-state.service';
import {Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';



export const handleAuth: HttpInterceptorFn = (req, next) => {
  const authState = inject(AuthState);
  const router = inject(Router);
  return next(req).pipe(

    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        authState.loggedIn.set(false);
        router.navigate(['/register']);
      }
      return throwError(() => err);
    }),

  );
};


