import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
  private MASTER_KEY = 'BeMiZYS2zX7TAa2NYGzHFmDITAd342Bz';
  constructor() {}

  public intercept(req: HttpRequest<{}>, next: HttpHandler): Observable<HttpEvent<{}>> {
    let params = req;
    const paramReq = req.clone({
      params: req.params.set('access_token', this.MASTER_KEY),
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
