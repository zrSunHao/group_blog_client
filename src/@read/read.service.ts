import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ResponseResult } from 'src/@shared/models/paging.model';
import { NoteContentM } from 'src/@topic/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReadService {

  public fileBaseUrl: string = '';
  private resourceUrl = environment.hostUrl + 'resource';
  private baseUrl = environment.hostUrl + 'note';

  constructor(public http: HttpClient) {
  }

  public opened(noteId: string) {
    this.fileBaseUrl = `${this.resourceUrl}/GetNoteFileByName?noteId=${noteId}&name=`;
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
