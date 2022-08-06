import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { OptionItem, ResponsePagingResult, ResponseResult } from 'src/@shared/models/paging.model';
import { environment } from 'src/environments/environment';
import { ColumnElet, DomainElet, SequnceM, TopicElet } from './model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  public baseUrl = environment.hostUrl + 'series';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  constructor(public http: HttpClient) { }

  public getDomainList(): Observable<ResponsePagingResult<DomainElet>> {
    const url = `${this.baseUrl}/getDomainList`;
    return this.http.get<ResponsePagingResult<DomainElet>>(url).pipe(catchError(this.handleError));
  }

  public addDomain(param: DomainElet): Observable<ResponseResult<DomainElet>> {
    const url = `${this.baseUrl}/addDomain`;
    return this.http.post<ResponseResult<DomainElet>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public updateDomain(param: DomainElet): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/updateDomain`;
    return this.http.patch<ResponseResult<boolean>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public deleteDomain(id: string): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/deleteDomain?id=${id}`;
    return this.http.delete<ResponseResult<boolean>>(url, this.httpOptions).pipe(catchError(this.handleError));
  }

  public sortDomain(param: OptionItem[]): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/sortDomain`;
    return this.http.patch<ResponseResult<boolean>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }



  public getTopicList(domainId: string): Observable<ResponsePagingResult<TopicElet>> {
    const url = `${this.baseUrl}/GetTopicList?domainId=${domainId}`;
    return this.http.get<ResponsePagingResult<TopicElet>>(url).pipe(catchError(this.handleError));
  }

  public addTopic(param: TopicElet): Observable<ResponseResult<TopicElet>> {
    const url = `${this.baseUrl}/addTopic`;
    return this.http.post<ResponseResult<TopicElet>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public updateTopic(param: TopicElet): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/updateTopic`;
    return this.http.patch<ResponseResult<boolean>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public deleteTopic(id: string): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/deleteTopic?id=${id}`;
    return this.http.delete<ResponseResult<boolean>>(url, this.httpOptions).pipe(catchError(this.handleError));
  }

  public sortTopic(param: SequnceM): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/sortTopic`;
    return this.http.patch<ResponseResult<boolean>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }



  public getColumnList(topicId: string): Observable<ResponsePagingResult<ColumnElet>> {
    const url = `${this.baseUrl}/GetColumnList?topicId=${topicId}`;
    return this.http.get<ResponsePagingResult<ColumnElet>>(url).pipe(catchError(this.handleError));
  }

  public addColumn(param: ColumnElet): Observable<ResponseResult<ColumnElet>> {
    const url = `${this.baseUrl}/addColumn`;
    return this.http.post<ResponseResult<ColumnElet>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public updateColumn(param: ColumnElet): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/updateColumn`;
    return this.http.patch<ResponseResult<boolean>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public deleteColumnc(id: string): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/deleteColumnc?id=${id}`;
    return this.http.delete<ResponseResult<boolean>>(url, this.httpOptions).pipe(catchError(this.handleError));
  }

  public sortColumn(param: SequnceM): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/sortColumn`;
    return this.http.patch<ResponseResult<boolean>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }



  private handleError(error: HttpErrorResponse) {
    const msg = `${error.status}  ${error.message}`
    return throwError(() => msg);
  }

}
