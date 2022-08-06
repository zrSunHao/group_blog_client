import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { ResetPsdM } from 'src/@security/auth.service';
import { PagingParameter, ResponsePagingResult, ResponseResult } from 'src/@shared/models/paging.model';
import { environment } from 'src/environments/environment';
import { UserElet, UserFilter } from './model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private baseUrl = environment.hostUrl + 'member';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  constructor(public http: HttpClient) { }

  public getList(param: PagingParameter<UserFilter>): Observable<ResponsePagingResult<UserElet>> {
    const url = `${this.baseUrl}/GetList`;
    return this.http.post<ResponsePagingResult<UserElet>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public update(param: UserElet): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/update`;
    return this.http.patch<ResponseResult<boolean>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public reset(param: ResetPsdM): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/managerResetPsd`;
    return this.http.patch<ResponseResult<boolean>>(url, param)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    const msg = `${error.status}  ${error.message}`
    return throwError(() => msg);
  }


}
