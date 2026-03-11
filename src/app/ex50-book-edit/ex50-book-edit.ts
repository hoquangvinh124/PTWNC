import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ex50Service } from '../services/ex50.service';

@Component({
  selector: 'app-ex50-book-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './ex50-book-edit.html',
  styleUrl: './ex50-book-edit.css',
})
export class Ex50BookEdit implements OnInit {
  book: any = null;
  bookId: string = '';

  imageOptions = [
    { label: 'Bìa 1 (Fantasy)', value: 'assets/books/b1.png' },
    { label: 'Bìa 2 (Sci-Fi)', value: 'assets/books/b2.png' },
    { label: 'Bìa 3 (Romance)', value: 'assets/books/b3.png' },
    { label: 'Bìa 4 (Technology)', value: 'assets/books/b4.png' },
    { label: 'Bìa 5 (History)', value: 'assets/books/b5.png' },
  ];

  constructor(
    private route: ActivatedRoute,
    private service: Ex50Service,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id') || '';
    if (this.bookId) {
      this.service.getBook(this.bookId).subscribe({
        next: (data) => this.book = data,
        error: (err) => console.error(err)
      });
    }
  }

  submit(): void {
    this.service.updateBook(this.bookId, this.book).subscribe({
      next: () => this.router.navigate(['/ex50/books']),
      error: (err) => console.error(err)
    });
  }

  cancel(): void {
    this.router.navigate(['/ex50/books']);
  }
}
