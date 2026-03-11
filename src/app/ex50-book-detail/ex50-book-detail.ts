import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ex50Service } from '../services/ex50.service';

@Component({
  selector: 'app-ex50-book-detail',
  imports: [CommonModule],
  templateUrl: './ex50-book-detail.html',
  styleUrl: './ex50-book-detail.css',
})
export class Ex50BookDetail implements OnInit {
  book: any = null;

  constructor(
    private route: ActivatedRoute,
    private service: Ex50Service,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getBook(id).subscribe({
        next: (data) => this.book = data,
        error: (err) => console.error(err)
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/ex50/books']);
  }
}
