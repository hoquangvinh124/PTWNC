import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ex58Service } from '../services/ex58.service';

@Component({
  selector: 'app-ex58-admin-list',
  imports: [CommonModule],
  templateUrl: './ex58-admin-list.html',
  styleUrl: './ex58-admin-list.css',
})
export class Ex58AdminList implements OnInit {
  fashions: any[] = [];
  loading = true;

  constructor(private service: Ex58Service, private router: Router) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (data) => { this.fashions = data; this.loading = false; },
      error: () => this.loading = false,
    });
  }

  addNew(): void { this.router.navigate(['/ex58-admin-form']); }
  edit(id: string): void { this.router.navigate(['/ex58-admin-form', id]); }
  view(id: string): void { this.router.navigate(['/ex58-client-detail', id]); }

  delete(id: string, title: string): void {
    if (confirm(`Xác nhận xóa: "${title}"?`)) {
      this.service.delete(id).subscribe({ next: () => this.load() });
    }
  }
}
