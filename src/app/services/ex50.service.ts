import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Ex50Service {
    private baseUrl = '/ex50/books';

    constructor(private http: HttpClient) { }

    getBooks(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl);
    }

    getBook(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${id}`);
    }

    createBook(book: any): Observable<any> {
        return this.http.post<any>(this.baseUrl, book);
    }

    updateBook(id: string, book: any): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/${id}`, book);
    }

    deleteBook(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${id}`);
    }
}
