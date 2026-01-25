import {InjectionToken} from '@angular/core';
import {AuthApi} from '../IAuthService/authapi';

export const AUTH_API = new InjectionToken<AuthApi>('AuthApi');
