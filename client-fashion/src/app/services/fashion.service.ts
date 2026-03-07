import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Fashion, ApiResponse } from '../models/fashion.model';

@Injectable({
  providedIn: 'root'
})
export class FashionService {
  private apiUrl = 'http://localhost:4000/api/fashions';

  constructor(private http: HttpClient) { }

  // Get all fashions
  getAllFashions(): Observable<ApiResponse<Fashion[]>> {
    return this.http.get<ApiResponse<Fashion[]>>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Get fashion by ID
  getFashionById(id: string): Observable<ApiResponse<Fashion>> {
    return this.http.get<ApiResponse<Fashion>>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Get fashions by style
  getFashionsByStyle(style: string): Observable<ApiResponse<Fashion[]>> {
    return this.http.get<ApiResponse<Fashion[]>>(`${this.apiUrl}/style/${style}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
