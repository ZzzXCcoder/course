import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';

import { routes } from './app.routes';
import {AUTH_API} from './auth/authService/auth-token';
import {AuthService} from './auth/authService/auth.service';
import {handleAuth} from './Interceptors/auth.interceptor';
import {addCredentials} from './Interceptors/creditionalstrue.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([handleAuth,addCredentials] )),
    {provide: AUTH_API, useClass: AuthService}
  ]
};
