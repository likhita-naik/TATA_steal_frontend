import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  jwtoken:string

  constructor() {
    this.jwtoken = localStorage.getItem('jwtoken')
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Clone the request and set the new header
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: 'Bearer '+ this.jwtoken,
        'Content-Type': 'application/json' // Example header, you can add more as needed
      }
    });

    // Pass the cloned request instead of the original request
    return next.handle(clonedRequest);

    // return next.handle(request);
  }
}



