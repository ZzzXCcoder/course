import {HttpInterceptorFn} from '@angular/common/http';

export const addCredentials: HttpInterceptorFn = (req, next) => {
  const reqWithCreds = req.clone({ withCredentials: true });
  return next(reqWithCreds);
};
