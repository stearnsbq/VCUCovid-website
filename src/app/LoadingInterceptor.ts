import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable()

export class LoadingInterceptor implements HttpInterceptor {
  private requests = 0;

  constructor(private api: ApiService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests++;
    this.api.loading = true;



    return next.handle(request).pipe(finalize(() => {
      this.requests--;
      if (this.requests <= 0) {
        this.api.loading = false;
      }
    }));

  }


}
