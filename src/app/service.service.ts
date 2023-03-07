import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  getAllNews() {
    return this.http
      .get('https://hacker-news.firebaseio.com/v0/newstories.json')
      .pipe(retry(1), catchError(this.handleError));
  }

  getOneNews(id: number) {
    return this.http
      .get(`https://hacker-news.firebaseio.com/v0/item/${String(id)}.json`)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
