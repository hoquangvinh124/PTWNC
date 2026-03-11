import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ex50Service } from '../services/ex50.service';

@Component({
  selector: 'app-ex50-book-new',
  imports: [CommonModule, FormsModule],
  templateUrl: './ex50-book-new.html',
  styleUrl: './ex50-book-new.css',
})
export class Ex50BookNew {
  book: any = {
    Title: '',
    Author: '',
    Price: 0,
    Image: 'assets/books/b1.png',
    Description: ''
  };

  imageOptions = [
    { label: 'Bìa 1 (Fantasy)', value: 'assets/books/b1.png' },
    { label: 'Bìa 2 (Sci-Fi)', value: 'assets/books/b2.png' },
    { label: 'Bìa 3 (Romance)', value: 'assets/books/b3.png' },
    { label: 'Bìa 4 (Technology)', value: 'assets/books/b4.png' },
    { label: 'Bìa 5 (History)', value: 'assets/books/b5.png' },
  ];

  constructor(private service: Ex50Service, private router: Router) { }

  submit(): void {
    this.service.createBook(this.book).subscribe({
      next: () => this.router.navigate(['/ex50/books']),
      error: (err) => console.error(err)
    });
  }

  cancel(): void {
    this.router.navigate(['/ex50/books']);
  }
}
