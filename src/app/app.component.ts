import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private baseUrl = environment.hostUrl + 'WeatherForecast';

  public constructor(private http: HttpClient) {
  }

  ngOnInit() {
    document.title = 'Group Blog ヾ(^▽^*)))';
    this.baseUrl = this.baseUrl.replace('/api', '');
    this.getAppName().subscribe({
      next: res => { if (res.name) document.title = res.name; },
      error: err => { console.log(err) },
    })
  }

  private getAppName(): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    const msg = `${error.status}  ${error.message}`
    return throwError(() => msg);
  }
}

