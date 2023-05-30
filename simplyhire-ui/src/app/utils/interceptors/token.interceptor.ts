import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const token = this.storage.getToken('authToken');

    if(!token){
    return next.handle(request);
  }else {
      const cloneReq = request.clone({setHeaders:{'Authorization': token}});
      return next.handle(cloneReq);
    }
    

  }
}
