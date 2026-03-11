import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ex58Service } from '../services/ex58.service';

@Component({
  selector: 'app-ex58-client-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './ex58-client-list.html',
  styleUrl: './ex58-client-list.css',
})
export class Ex58ClientList implements OnInit {
  allFashions: any[] = [];
  grouped: { [style: string]: any[] } = {};
  styles: string[] = [];
  selectedStyle = 'all';
  loading = true;

  constructor(private service: Ex58Service, private router: Router) { }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.allFashions = data;
        this.buildGroups(data);
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  buildGroups(data: any[]): void {
    this.grouped = {};
    for (const f of data) {
      if (!this.grouped[f.style]) this.grouped[f.style] = [];
      this.grouped[f.style].push(f);
    }
    this.styles = Object.keys(this.grouped);
  }

  onStyleChange(): void {
    if (this.selectedStyle === 'all') {
      this.buildGroups(this.allFashions);
    } else {
      this.buildGroups(this.allFashions.filter(f => f.style === this.selectedStyle));
    }
  }

  viewDetail(id: string): void {
    this.router.navigate(['/ex58-client-detail', id]);
  }

  get groupKeys(): string[] {
    return Object.keys(this.grouped);
  }
}
