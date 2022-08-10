import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { NoteElet } from 'src/@cmpts/note-item/note-item.component';
import { AUTH_KEY, LoginRes } from 'src/@security/auth.service';
import { OptionItem, PagingParameter, ResponsePagingResult, ResponseResult } from 'src/@shared/models/paging.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public fileBaseUrl: string = '';
  private resourceUrl = environment.hostUrl + 'resource';
  private baseUrl = environment.hostUrl + 'note';
  private seriesUrl = environment.hostUrl + 'series';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  constructor(public http: HttpClient) {
    this.init();
  }

  public init() {
    let key: string = '';
    const json = localStorage.getItem(AUTH_KEY);
    if (json) {
      const res = JSON.parse(json) as LoginRes;
      if (res) key = res.key;
    }
    this.fileBaseUrl = `${this.resourceUrl}/GetFileByName?key=${key}&name=`;
  }

  public getList(param: PagingParameter<string>): Observable<ResponsePagingResult<NoteElet>> {
    const url = `${this.baseUrl}/getOpenedList`;
    return this.http.post<ResponsePagingResult<NoteElet>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public getColumnItems(): Observable<ResponsePagingResult<OptionItem>> {
    const url = `${this.seriesUrl}/GetFavoriteColumnItems`;
    return this.http.get<ResponsePagingResult<OptionItem>>(url).pipe(catchError(this.handleError));
  }

  public toNoteColumn(id: string, columnId: string): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/favorite?id=${id}&columnId=${columnId}`;
    return this.http.patch<ResponseResult<boolean>>(url, {}, this.httpOptions).pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    const msg = `${error.status}  ${error.message}`
    return throwError(() => msg);
  }

}
