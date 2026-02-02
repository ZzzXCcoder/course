import {CanActivateFn} from '@angular/router';
import {AuthState} from '../states/auth-state.service';
import {inject} from '@angular/core';
import {AuthService} from '../auth/authService/auth.service';
import {catchError, firstValueFrom, of} from 'rxjs';



export const authGuard: CanActivateFn = async () => {
  const authState = inject(AuthState);
  const authService = inject(AuthService);

  try {
    await firstValueFrom(
      authService.me().pipe(
        catchError(() => of(null))
      )
    );

    return authState.loggedIn();
  } catch {
    return false;
  }
};

export const nonAuthGuard: CanActivateFn = () => {
  const authState = inject(AuthState);
  return !authState.loggedIn();
}

