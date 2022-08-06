import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ResponseResult, RoleType } from 'src/@shared/models/paging.model';
import { environment } from 'src/environments/environment';

export class LoginM {
  userName: string = '';
  password: string = '';
}

export class LoginRes {
  userName: string = '';
  role: RoleType = RoleType.odinary;
  key: string = '';
  token: string = '';
}

export class ResetPsdM {
  userName: string = '';
  newPsd: string = '';
  oldPsd: string = '';
}

export const AUTH_KEY = 'auth_key';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.hostUrl + 'member';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  constructor(public http: HttpClient) { }

  public login(param: LoginM): Observable<ResponseResult<LoginRes>> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<ResponseResult<LoginRes>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public register(param: LoginM): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/register`;
    return this.http.post<ResponseResult<boolean>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public reset(param: ResetPsdM): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/myselfResetPsd`;
    return this.http.patch<ResponseResult<boolean>>(url, param)
      .pipe(catchError(this.handleError));
  }

  public logout(): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/logout`;
    return this.http.delete<ResponseResult<boolean>>(url, this.httpOptions).pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    const msg = `${error.status}  ${error.message}`
    return throwError(() => msg);
  }

}
