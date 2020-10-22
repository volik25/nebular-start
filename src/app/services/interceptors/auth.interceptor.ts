import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
  constructor() {}

  public intercept(req: HttpRequest<{}>, next: HttpHandler): Observable<HttpEvent<{}>> {
    let params = req;
    const paramReq = req.clone({
      params: req.params.set('access_token', this.token),
    });
    params = paramReq;
    // if (sessionStorage.getItem('bookingUserToken')) {
    //   let token = sessionStorage.getItem('bookingUserToken');
    //   const paramReq = req.clone({
    //     params: req.params.set('token', token),
    //   });
    //   params = paramReq;
    // }
    return next.handle(params);
  }
}
