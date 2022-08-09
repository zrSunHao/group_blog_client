import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AUTH_KEY, LoginRes } from 'src/@security/auth.service';
import { ResponseResult } from 'src/@shared/models/paging.model';
import { NoteContentM } from 'src/@topic/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  public fileBaseUrl: string = '';
  private resourceUrl = environment.hostUrl + 'resource';
  private baseUrl = environment.hostUrl + 'note';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

  constructor(public http: HttpClient) {
    let key: string = '';
    const json = localStorage.getItem(AUTH_KEY);
    if (json) {
      const res = JSON.parse(json) as LoginRes;
      if (res) key = res.key;
    }
    this.fileBaseUrl = `${this.resourceUrl}/GetFileByName?key=${key}&name=`;
  }

  public opened(noteId: string) {
    this.fileBaseUrl = `${this.resourceUrl}/GetNoteFileByName?noteId=${noteId}&name=`;
  }

  public getMyNoteContent(id: string): Observable<ResponseResult<NoteContentM>> {
    const url = `${this.baseUrl}/GetContent?id=${id}`;
    return this.http.get<ResponseResult<NoteContentM>>(url).pipe(catchError(this.handleError));
  }

  public getOpenedNoteContent(id: string): Observable<ResponseResult<NoteContentM>> {
    const url = `${this.baseUrl}/getOpenedContent?id=${id}`;
    return this.http.get<ResponseResult<NoteContentM>>(url).pipe(catchError(this.handleError));
  }



  private handleError(error: HttpErrorResponse) {
    const msg = `${error.status}  ${error.message}`
    return throwError(() => msg);
  }

}
