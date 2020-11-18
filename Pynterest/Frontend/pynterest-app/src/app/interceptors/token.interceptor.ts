import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '@app/core/services/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private localStorageService:LocalStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userToken = this.localStorageService.get<string>("userToken");
    if (userToken) {
      const jwt = userToken["jwt"];
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Token ' + jwt),
      });
      req = authReq;
    }
    return next.handle(req);
  }
}
