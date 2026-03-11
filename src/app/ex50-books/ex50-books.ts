import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ex50Service } from '../services/ex50.service';

@Component({
  selector: 'app-ex50-books',
  imports: [CommonModule],
  templateUrl: './ex50-books.html',
  styleUrl: './ex50-books.css',
})
export class Ex50Books implements OnInit {
  books: any[] = [];

  constructor(private service: Ex50Service, private router: Router) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.service.getBooks().subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error(err)
    });
  }

  createNew(): void {
    this.router.navigate(['/ex50/book-new']);
  }

  viewDetail(id: string): void {
    this.router.navigate(['/ex50/books', id]);
  }

  editBook(id: string): void {
    this.router.navigate(['/ex50/book-edit', id]);
  }

  deleteBook(id: string): void {
    if (confirm('Bạn có chắc muốn xóa cuốn sách này không?')) {
      this.service.deleteBook(id).subscribe({
        next: () => this.loadBooks(),
        error: (err) => console.error(err)
      });
    }
  }
}
