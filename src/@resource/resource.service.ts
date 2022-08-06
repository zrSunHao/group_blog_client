import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PagingParameter, ResponsePagingResult } from 'src/@shared/models/paging.model';
import { environment } from 'src/environments/environment';
import { ResourceElet, ResourceFilter } from './model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  public baseUrl = environment.hostUrl + 'resource';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  constructor(public http: HttpClient) { }

  public getList(param: PagingParameter<ResourceFilter>): Observable<ResponsePagingResult<ResourceElet>> {
    const url = `${this.baseUrl}/GetList`;
    return this.http.post<ResponsePagingResult<ResourceElet>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    const msg = `${error.status}  ${error.message}`
    return throwError(() => msg);
  }
}
