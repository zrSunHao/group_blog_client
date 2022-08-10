import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ColumnElet } from 'src/@cmpts/column-item/column-item.component';
import { NoteElet } from 'src/@cmpts/note-item/note-item.component';
import { FileCategory } from 'src/@resource/model';
import { AUTH_KEY, LoginRes } from 'src/@security/auth.service';
import { OptionItem, ResponsePagingResult, ResponseResult } from 'src/@shared/models/paging.model';
import { environment } from 'src/environments/environment';
import { DomainElet, NoteContentM, SequnceM, TopicElet } from './model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  public fileBaseUrl: string = '';
  private baseUrl = environment.hostUrl + 'series';
  private resourceUrl = environment.hostUrl + 'resource';
  private noteUrl = environment.hostUrl + 'note';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  public dragTopic: TopicElet | null = null;
  public dragTopicDomain: DomainElet | null = null;

  constructor(public http: HttpClient) {
  }

  public init(){
    let key: string = '';
    const json = localStorage.getItem(AUTH_KEY);
    if (json) {
      const res = JSON.parse(json) as LoginRes;
      if (res) key = res.key;
    }
    this.fileBaseUrl = `${this.resourceUrl}/GetFileByName?key=${key}&name=`;
  }

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

  public getDomainItems(): Observable<ResponsePagingResult<OptionItem>> {
    const url = `${this.baseUrl}/getDomainItems`;
    return this.http.get<ResponsePagingResult<OptionItem>>(url).pipe(catchError(this.handleError));
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

  public addTopicLogo(id: string, logo: string): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/addTopicLogo?id=${id}&logo=${logo}`;
    return this.http.patch<ResponseResult<boolean>>(url, {}, this.httpOptions).pipe(catchError(this.handleError));
  }

  public getTopicItems(domainId: string): Observable<ResponsePagingResult<OptionItem>> {
    const url = `${this.baseUrl}/getTopicItems?domainId=${domainId}`;
    return this.http.get<ResponsePagingResult<OptionItem>>(url).pipe(catchError(this.handleError));
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

  public deleteColumn(id: string): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/deleteColumn?id=${id}`;
    return this.http.delete<ResponseResult<boolean>>(url, this.httpOptions).pipe(catchError(this.handleError));
  }

  public sortColumn(param: SequnceM): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/sortColumn`;
    return this.http.patch<ResponseResult<boolean>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public addColumnLogo(id: string, logo: string): Observable<ResponseResult<boolean>> {
    const url = `${this.baseUrl}/addColumnLogo?id=${id}&logo=${logo}`;
    return this.http.patch<ResponseResult<boolean>>(url, {}, this.httpOptions).pipe(catchError(this.handleError));
  }

  public getColumnItems(topicId: string): Observable<ResponsePagingResult<OptionItem>> {
    const url = `${this.baseUrl}/getColumnItems?topicId=${topicId}`;
    return this.http.get<ResponsePagingResult<OptionItem>>(url).pipe(catchError(this.handleError));
  }



  public getMyNoteList(columnId: string | null): Observable<ResponsePagingResult<NoteElet>> {
    const url = `${this.noteUrl}/GetMyList?columnId=${columnId}`;
    return this.http.get<ResponsePagingResult<NoteElet>>(url).pipe(catchError(this.handleError));
  }

  public addNote(param: NoteElet): Observable<ResponseResult<NoteElet>> {
    const url = `${this.noteUrl}/add`;
    return this.http.post<ResponseResult<NoteElet>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public updateNote(param: NoteElet): Observable<ResponseResult<boolean>> {
    const url = `${this.noteUrl}/update`;
    return this.http.patch<ResponseResult<boolean>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public deleteNote(id: string): Observable<ResponseResult<boolean>> {
    const url = `${this.noteUrl}/delete?id=${id}`;
    return this.http.delete<ResponseResult<boolean>>(url, this.httpOptions).pipe(catchError(this.handleError));
  }

  public openNote(id: string, opened: boolean): Observable<ResponseResult<boolean>> {
    const url = `${this.noteUrl}/open?id=${id}&opened=${opened}`;
    return this.http.patch<ResponseResult<boolean>>(url, {}, this.httpOptions).pipe(catchError(this.handleError));
  }

  public addNoteProfile(id: string, profileName: string): Observable<ResponseResult<boolean>> {
    const url = `${this.noteUrl}/addProfile?id=${id}&profileName=${profileName}`;
    return this.http.patch<ResponseResult<boolean>>(url, {}, this.httpOptions).pipe(catchError(this.handleError));
  }

  public toNoteColumn(id: string, columnId: string): Observable<ResponseResult<boolean>> {
    const url = `${this.noteUrl}/toColumn?id=${id}&columnId=${columnId}`;
    return this.http.patch<ResponseResult<boolean>>(url, {}, this.httpOptions).pipe(catchError(this.handleError));
  }

  public sortNote(param: SequnceM): Observable<ResponseResult<boolean>> {
    const url = `${this.noteUrl}/sortMyNotes`;
    return this.http.patch<ResponseResult<boolean>>(url, param, this.httpOptions).pipe(catchError(this.handleError));
  }

  public getNoteContent(id: string): Observable<ResponseResult<NoteContentM>> {
    const url = `${this.noteUrl}/GetContent?id=${id}`;
    return this.http.get<ResponseResult<NoteContentM>>(url).pipe(catchError(this.handleError));
  }

  public saveNoteContent(param: NoteContentM): Observable<ResponseResult<boolean>> {
    const url = `${this.noteUrl}/saveContent`;
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
