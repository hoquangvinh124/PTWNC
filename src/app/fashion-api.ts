import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { IFashion } from './interfaces/Fashion';

@Injectable({
  providedIn: 'root',
})
export class FashionAPIService {

  constructor(private _http: HttpClient) { }

  getFashion(id: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.get<any>("http://localhost:3001/fashions/" + id, requestOptions).pipe(
      map(res => JSON.parse(res) as IFashion),
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
