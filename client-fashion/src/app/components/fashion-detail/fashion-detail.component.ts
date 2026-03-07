import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FashionService } from '../../services/fashion.service';
import { Fashion } from '../../models/fashion.model';

@Component({
  selector: 'app-fashion-detail',
  imports: [CommonModule],
  templateUrl: './fashion-detail.component.html',
  styleUrls: ['./fashion-detail.component.css']
})
export class FashionDetailComponent implements OnInit {
  fashion = signal<Fashion | null>(null);
  loading = signal(false);
  error = signal('');

  constructor(
    private fashionService: FashionService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: { [key: string]: string }) => {
      const id = params['id'];
      if (id) {
        this.loadFashion(id);
      }
    });
  }

  loadFashion(id: string): void {
    this.loading.set(true);
    this.error.set('');
    
    this.fashionService.getFashionById(id).subscribe({
      next: (response: { success: boolean; data?: Fashion }) => {
        if (response.success && response.data) {
          this.fashion.set(response.data);
        } else {
          this.error.set('Fashion not found');
        }
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/600x800/CCCCCC/000000?text=No+Image';
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
