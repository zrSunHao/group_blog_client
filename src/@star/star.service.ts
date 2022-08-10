import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ColumnElet } from 'src/@cmpts/column-item/column-item.component';
import { NoteElet } from 'src/@cmpts/note-item/note-item.component';
import { FileCategory } from 'src/@resource/model';
import { AUTH_KEY, LoginRes } from 'src/@security/auth.service';
import { OptionItem, PagingParameter, ResponsePagingResult, ResponseResult } from 'src/@shared/models/paging.model';
import { SequnceM } from 'src/@topic/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StarService {

  public fileBaseUrl: string = '';
  private resourceUrl = environment.hostUrl + 'resource';
  private noteUrl = environment.hostUrl + 'note';
  private baseUrl = environment.hostUrl + 'series';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  constructor(public http: HttpClient) {
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

  public getColumnList(): Observable<ResponsePagingResult<ColumnElet>> {
    const url = `${this.baseUrl}/GetFavoriteColumnList`;
    return this.http.get<ResponsePagingResult<ColumnElet>>(url).pipe(catchError(this.handleError));
  }

  public addColumn(param: ColumnElet): Observable<ResponseResult<ColumnElet>> {
    param.topicId = 'myf';
    const url = `${this.baseUrl}/AddFavoriteColumn`;
    return this.http.post<ResponseResult<ColumnElet>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public updateColumn(param: ColumnElet): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/updateColumn`;
    return this.http.patch<ResponseResult<boolean>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public deleteColumn(id: string): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/DeleteFavoriteColumn?id=${id}`;
    return this.http.delete<ResponseResult<boolean>>(url, this.httpOptions).pipe(catchError(this.handleError));
  }

  public sortColumn(param: SequnceM): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/SortFavoriteColumn`;
    return this.http.patch<ResponseResult<boolean>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public addColumnLogo(id: string, logo: string): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/addColumnLogo?id=${id}&logo=${logo}`;
    return this.http.patch<ResponseResult<boolean>>(url, {}, this.httpOptions).pipe(catchError(this.handleError));
  }

  public getColumnItems(): Observable<ResponsePagingResult<OptionItem>> {
    const url = `${this.baseUrl}/GetFavoriteColumnItems`;
    return this.http.get<ResponsePagingResult<OptionItem>>(url).pipe(catchError(this.handleError));
  }



  public toNoteColumn(id: string, columnId: string): Observable<ResponseResult<boolean>> {
    const url = `${this.noteUrl}/favorite?id=${id}&columnId=${columnId}`;
    return this.http.patch<ResponseResult<boolean>>(url, {}, this.httpOptions).pipe(catchError(this.handleError));
  }

  public getNoteList(columnId: string): Observable<ResponsePagingResult<NoteElet>> {
    const url = `${this.noteUrl}/GetFavoriteList?columnId=${columnId}`;
    return this.http.get<ResponsePagingResult<NoteElet>>(url).pipe(catchError(this.handleError));
  }

  public cancelNote(id: string): Observable<ResponseResult<boolean>> {
    const url = `${this.noteUrl}/CancelFavorite?id=${id}`;
    return this.http.delete<ResponseResult<boolean>>(url, this.httpOptions).pipe(catchError(this.handleError));
  }

  public sortNote(param: SequnceM): Observable<ResponseResult<boolean>> {
    const url = `${this.noteUrl}/SortFavoriteNotes`;
    return this.http.patch<ResponseResult<boolean>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public logo(ownerId: string, category: FileCategory, formData: FormData): Observable<ResponseResult<string>> {
    const url = `${this.resourceUrl}/Save?ownerId=${ownerId}&category=${category}`;
    return this.http.post<ResponseResult<string>>(url, formData)
      .pipe(catchError(this.handleError));
  }



  private handleError(error: HttpErrorResponse) {
    const msg = `${error.status}  ${error.message}`
    return throwError(() => msg);
  }

}
