import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { IFakeProduct } from '../interfaces/IFakeProduct';

@Injectable({
  providedIn: 'root'
})
export class Ex27Service {
  private _url: string = 'https://fakestoreapi.com/products';

  constructor(private _http: HttpClient) { }

  getEx27Data(): Observable<any> {
    console.log('Fetching products from:', this._url);
    return this._http.get<any>(this._url).pipe(
      map(res => {
        console.log('Raw response:', res);
        const parsed = res as Array<IFakeProduct>;
        console.log('Parsed products:', parsed);
        return parsed;
      }),
      retry(3),
      catchError(error => {
        console.error('Error fetching products:', error);
        return this.handleError(error);
      })
    );
  }

  handleError(error: HttpErrorResponse) {
    console.error('Service error:', error);
    return throwError(() => new Error(error.message));
  }
}
