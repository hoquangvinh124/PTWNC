import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FashionService } from '../../services/fashion.service';
import { Fashion } from '../../models/fashion.model';

@Component({
  selector: 'app-fashion-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './fashion-list.component.html',
  styleUrls: ['./fashion-list.component.css']
})
export class FashionListComponent implements OnInit {
  fashions = signal<Fashion[]>([]);
  loading = signal(false);
  error = signal('');

  constructor(private fashionService: FashionService) {}

  ngOnInit(): void {
    this.loadFashions();
  }

  loadFashions(): void {
    this.loading.set(true);
    this.error.set('');
    
    this.fashionService.getAllFashions().subscribe({
      next: (response: { success: boolean; data?: Fashion[] }) => {
        if (response.success && response.data) {
          this.fashions.set(response.data);
        }
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  confirmDelete(fashion: Fashion): void {
    if (!fashion._id) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to delete "${fashion.title}"?\nThis action cannot be undone.`
    );
    
    if (confirmed) {
      this.deleteFashion(fashion._id);
    }
  }

  deleteFashion(id: string): void {
    this.loading.set(true);
    
    this.fashionService.deleteFashion(id).subscribe({
      next: (response: { success: boolean; message?: string }) => {
        if (response.success) {
          this.loadFashions();
        }
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.loading.set(false);
        alert('Error deleting fashion: ' + err.message);
      }
    });
  }

  getStyleBadgeClass(style: string): string {
    const styleMap: Record<string, string> = {
      'Casual': 'bg-primary',
      'Formal': 'bg-dark',
      'Sport': 'bg-success'
    };
    return styleMap[style] || 'bg-secondary';
  }
}
