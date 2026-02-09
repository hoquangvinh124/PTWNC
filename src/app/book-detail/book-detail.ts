import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookAPIService } from '../book-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  imports: [CommonModule],
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.css']
})
export class BookDetail implements OnInit {
  book: any;
  errMessage: string = '';
  
  constructor(private _service: BookAPIService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // Check if there's an id in the route params
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.searchBook(bookId);
    }
  }
  
  searchBook(bookId: string) {
    this._service.getBook(bookId).subscribe({
      next: (data) => { this.book = data },
      error: (err) => { this.errMessage = err.message || err }
    });
  }
}
