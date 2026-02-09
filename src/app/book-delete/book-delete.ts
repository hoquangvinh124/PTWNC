import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookAPIService } from '../book-api.service';

@Component({
  selector: 'app-book-delete',
  imports: [CommonModule],
  templateUrl: './book-delete.html',
  styleUrls: ['./book-delete.css']
})
export class BookDelete implements OnInit {
  books: any[] = [];
  errMessage: string = '';
  successMessage: string = '';
  
  constructor(private _service: BookAPIService) {
  }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this._service.getBooks().subscribe({
      next: (data) => { 
        this.books = data;
        console.log('Books loaded:', data);
      },
      error: (err) => { 
        this.errMessage = err.message || err;
        console.error('Error loading books:', err);
      }
    });
  }
  
  deleteBook(bookId: any) {
    if (!bookId || bookId.trim() === '') {
      this.errMessage = 'Please enter a Book ID';
      return;
    }
    
    console.log('Deleting book with ID:', bookId);
    this._service.deleteBook(bookId).subscribe({
      next: (data) => { 
        console.log('Book deleted successfully, remaining books:', data);
        this.books = data;
        this.successMessage = `Book ${bookId} deleted successfully!`;
        this.errMessage = '';
      },
      error: (err) => { 
        this.errMessage = err.message || err;
        this.successMessage = '';
        console.error('Error deleting book:', err);
      }
    });
  }
}
