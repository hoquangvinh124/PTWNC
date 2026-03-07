import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FashionService } from '../../services/fashion.service';
import { Fashion, StyleGroup } from '../../models/fashion.model';

@Component({
  selector: 'app-fashion-catalog',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './fashion-catalog.component.html',
  styleUrls: ['./fashion-catalog.component.css']
})
export class FashionCatalogComponent implements OnInit {
  allFashions = signal<Fashion[]>([]);
  searchStyle = signal('');
  availableStyles = signal<string[]>([]);
  loading = signal(false);
  error = signal('');

  // Computed property to group fashions by style with filtering
  styleGroups = computed<StyleGroup[]>(() => {
    const fashions = this.allFashions();
    const styleFilter = this.searchStyle().trim();

    // Filter fashions by style if search is active
    const filteredFashions = styleFilter
      ? fashions.filter((f: Fashion) => f.style.toLowerCase().includes(styleFilter.toLowerCase()))
      : fashions;

    // Group fashions by style
    const grouped = filteredFashions.reduce((acc: Record<string, Fashion[]>, fashion: Fashion) => {
      if (!acc[fashion.style]) {
        acc[fashion.style] = [];
      }
      acc[fashion.style].push(fashion);
      return acc;
    }, {});

    // Convert to array of StyleGroup
    return Object.entries(grouped).map(([style, fashions]) => ({
      style,
      fashions
    }));
  });

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
          this.allFashions.set(response.data);
          
          // Extract unique styles
          const styles = [...new Set(response.data.map((f: Fashion) => f.style))];
          this.availableStyles.set(styles);
        }
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  onStyleSearch(): void {
    // The computed property will automatically update when searchStyle changes
  }

  clearSearch(): void {
    this.searchStyle.set('');
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/300x400/CCCCCC/000000?text=No+Image';
  }
}
