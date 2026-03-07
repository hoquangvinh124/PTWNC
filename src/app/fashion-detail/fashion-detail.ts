import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FashionAPIService } from '../fashion-api';
import { FashionApiService } from '../services/fashion-api.service';
import { IFashion, Fashion } from '../interfaces/Fashion';

@Component({
  selector: 'app-fashion-detail',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './fashion-detail.html',
  styleUrl: './fashion-detail.css',
})
export class FashionDetailComponent implements OnInit {
  // Old fashion detail (keep for backwards compatibility)
  fashion: IFashion | null = null;
  errMessage: string = '';
  fashionId: string = '640b187e71d9faa9039ff97d';

  // New fashion detail
  fashionDetail = signal<Fashion | null>(null);
  loading = signal(false);
  error = signal('');
  useNewApi = signal(true); // Toggle between old and new API

  constructor(
    private _service: FashionAPIService,
    private fashionService: FashionApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Try to get ID from route params first (for new fashion system)
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.useNewApi.set(true);
        this.loadNewFashion(id);
      }
    });
  }

  // Old API method (for backwards compatibility)
  searchFashion() {
    this._service.getFashion(this.fashionId).subscribe({
      next: (data) => {
        this.fashion = data;
        this.errMessage = '';
        this.useNewApi.set(false);
      },
      error: (err) => {
        this.errMessage = err;
        this.fashion = null;
      }
    });
  }

  // New API method
  loadNewFashion(id: string): void {
    this.loading.set(true);
    this.error.set('');
    
    this.fashionService.getFashionById(id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.fashionDetail.set(response.data);
        } else {
          this.error.set('Fashion not found');
        }
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load fashion details. Please make sure the server is running on port 4000.');
        console.error('Error loading fashion:', error);
        this.loading.set(false);
      }
    });
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
      month: 'long',
      day: 'numeric'
    });
  }

  goBack(): void {
    this.router.navigate(['/fashion-catalog']);
  }
}
