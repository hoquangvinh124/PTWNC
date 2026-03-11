import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Ex58Service {
    private base = '/api/fashions';

    constructor(private http: HttpClient) { }

    getAll(): Observable<any[]> {
        return this.http.get<any>(this.base).pipe(map((r) => r.data));
    }

    getByStyle(style: string): Observable<any[]> {
        return this.http.get<any>(`${this.base}/style/${encodeURIComponent(style)}`).pipe(map((r) => r.data));
    }

    getById(id: string): Observable<any> {
        return this.http.get<any>(`${this.base}/${id}`).pipe(map((r) => r.data));
    }

    create(fashion: any): Observable<any> {
        return this.http.post<any>(this.base, fashion);
    }

    update(id: string, fashion: any): Observable<any> {
        return this.http.put<any>(`${this.base}/${id}`, fashion);
    }

    delete(id: string): Observable<any> {
        return this.http.delete<any>(`${this.base}/${id}`);
    }
}
