import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FashionApiService } from '../services/fashion-api.service';
import { Fashion } from '../interfaces/Fashion';

@Component({
  selector: 'app-admin-fashion-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-fashion-list.html',
  styleUrls: ['./admin-fashion-list.css']
})
export class AdminFashionListComponent implements OnInit {
  fashions = signal<Fashion[]>([]);
  filteredFashions = signal<Fashion[]>([]);
  loading = signal(false);
  error = signal('');
  selectedStyle = signal('all');
  styles = ['Casual', 'Formal', 'Sport'];

  constructor(private fashionService: FashionApiService) { }

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
          this.filterByStyle();
        }
        this.loading.set(false);
      },
      error: (error: Error) => {
        this.error.set('Failed to load fashions. Please make sure the server is running on port 4000.');
        console.error('Error loading fashions:', error);
        this.loading.set(false);
      }
    });
  }

  filterByStyle(): void {
    if (this.selectedStyle() === 'all') {
      this.filteredFashions.set(this.fashions());
    } else {
      this.filteredFashions.set(this.fashions().filter(f => f.style === this.selectedStyle()));
    }
  }

  onStyleChange(style: string): void {
    this.selectedStyle.set(style);
    this.filterByStyle();
  }

  deleteFashion(fashion: Fashion): void {
    if (!fashion._id) return;

    const confirmDelete = confirm(`Are you sure you want to delete "${fashion.title}"?`);
    
    if (confirmDelete) {
      this.fashionService.deleteFashion(fashion._id).subscribe({
        next: (response: { success: boolean }) => {
          if (response.success) {
            alert('Fashion deleted successfully');
            this.loadFashions();
          }
        },
        error: (error: Error) => {
          alert('Failed to delete fashion');
          console.error('Error deleting fashion:', error);
        }
      });
    }
  }

  getStyleBadgeClass(style: string): string {
    switch(style) {
      case 'Casual': return 'bg-info';
      case 'Formal': return 'bg-dark';
      case 'Sport': return 'bg-success';
      default: return 'bg-secondary';
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  stripHtml(html: string): string {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  truncateText(text: string, length: number): string {
    const stripped = this.stripHtml(text);
    return stripped.length > length ? stripped.substring(0, length) + '...' : stripped;
  }

  getCountByStyle(style: string): number {
    return this.fashions().filter(f => f.style === style).length;
  }
}
