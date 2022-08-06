import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTH_KEY, LoginRes } from 'src/@security/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const json = localStorage.getItem(AUTH_KEY);
        if (json) {
            const res = JSON.parse(json) as LoginRes;
            if(res){
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${res.token}`
                    }
                });
            }
        }
        return next.handle(request);
    }
}