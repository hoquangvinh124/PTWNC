import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FashionApiService } from '../services/fashion-api.service';
import { Fashion } from '../interfaces/Fashion';

interface StyleGroup {
  style: string;
  fashions: Fashion[];
}

@Component({
  selector: 'app-fashion-catalog',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './fashion-catalog.html',
  styleUrls: ['./fashion-catalog.css']
})
export class FashionCatalogComponent implements OnInit {
  styleGroups = signal<StyleGroup[]>([]);
  allFashions = signal<Fashion[]>([]);
  loading = signal(false);
  error = signal('');
  searchStyle = signal('');
  availableStyles = signal<string[]>([]);

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
          this.allFashions.set(response.data);
          this.groupByStyle(response.data);
          
          // Extract unique styles
          const styles = [...new Set(response.data.map((f: Fashion) => f.style))];
          this.availableStyles.set(styles);
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

  groupByStyle(fashions: Fashion[]): void {
    const grouped = fashions.reduce((acc, fashion) => {
      const existing = acc.find((g: StyleGroup) => g.style === fashion.style);
      if (existing) {
        existing.fashions.push(fashion);
      } else {
        acc.push({ style: fashion.style, fashions: [fashion] });
      }
      return acc;
    }, [] as StyleGroup[]);

    this.styleGroups.set(grouped);
  }

  onSearchStyle(): void {
    const style = this.searchStyle().trim();
    
    if (!style) {
      // Show all if search is empty
      this.groupByStyle(this.allFashions());
      return;
    }

    this.loading.set(true);
    this.fashionService.getFashionsByStyle(style).subscribe({
      next: (response: { success: boolean; data?: Fashion[] }) => {
        if (response.success && response.data) {
          this.groupByStyle(response.data);
        }
        this.loading.set(false);
      },
      error: (error: Error) => {
        console.error('Error filtering fashions:', error);
        this.loading.set(false);
      }
    });
  }

  onStyleSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.searchStyle.set(target.value);
    this.onSearchStyle();
  }

  clearSearch(): void {
    this.searchStyle.set('');
    this.groupByStyle(this.allFashions());
  }

  getStyleBadgeClass(style: string): string {
    switch(style) {
      case 'Casual': return 'bg-info';
      case 'Formal': return 'bg-dark';
      case 'Sport': return 'bg-success';
      default: return 'bg-secondary';
    }
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
}
