import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { IBitcoinData } from '../interfaces/IBitcoinData';

@Injectable({
  providedIn: 'root'
})
export class Ex28Service {
  private _url: string = '/v1/bpi/currentprice.json';

  constructor(private _http: HttpClient) { }

  getEx28Data(): Observable<any> {
    return this._http.get<any>(this._url).pipe(
      map(res => res as IBitcoinData),
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    console.error('Ex28Service error:', error);
    return throwError(() => new Error(error.message || 'Failed to fetch data'));
  }
}
