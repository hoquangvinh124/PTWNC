import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { BookAPIService } from '../book-api.service';
import { Book } from '../interfaces/Book';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-book-new',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-new.html',
  styleUrls: ['./book-new.css']
})
export class BookNew implements OnInit {
  book = new Book();
  books: any;
  errMessage: string = '';
  fileName: string = '';
  uploadProgress: number = 0;
  
  constructor(private _service: BookAPIService, private http: HttpClient) {
  }

  ngOnInit() {
    this._service.getBooks().subscribe({
      next: (data) => { this.books = data },
      error: (err) => { this.errMessage = err.message || err }
    });
  }
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("image", file);
      
      const upload$ = this.http.post("/upload", formData, {
        reportProgress: true,
        observe: 'events',
        responseType: 'text'
      })
      .pipe(
        finalize(() => {
          this.uploadProgress = 0;
        })
      );
      
      upload$.subscribe({
        next: (event) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
          } else if (event.type == HttpEventType.Response) {
            // Upload successful, update book image
            this.book.Image = this.fileName;
          }
        },
        error: (err) => {
          this.errMessage = 'Upload failed: ' + err.message;
        }
      });
    }
  }
  
  postBook() {
    this._service.postBook(this.book).subscribe({
      next: (data) => { 
        this.books = data;
        this.book = new Book(); // Reset form
        this.fileName = '';
      },
      error: (err) => { this.errMessage = err.message || err }
    });
  }
}
