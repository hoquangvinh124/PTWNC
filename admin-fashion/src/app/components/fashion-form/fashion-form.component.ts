import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FashionService } from '../../services/fashion.service';
import { Fashion } from '../../models/fashion.model';

@Component({
  selector: 'app-fashion-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './fashion-form.component.html',
  styleUrls: ['./fashion-form.component.css']
})
export class FashionFormComponent implements OnInit {
  fashion: Fashion = {
    title: '',
    details: '',
    thumbnail: '',
    style: 'Casual',
    creationDate: new Date()
  };

  styles = ['Casual', 'Formal', 'Sport'];
  isEditMode = signal(false);
  fashionId = signal('');
  loading = signal(false);
  error = signal('');
  submitButtonText = signal('Create Fashion');

  constructor(
    private fashionService: FashionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: { [key: string]: string }) => {
      const id = params['id'];
      if (id) {
        this.isEditMode.set(true);
        this.fashionId.set(id);
        this.submitButtonText.set('Update Fashion');
        this.loadFashion(id);
      }
    });
  }

  loadFashion(id: string): void {
    this.loading.set(true);
    this.fashionService.getFashionById(id).subscribe({
      next: (response: { success: boolean; data?: Fashion }) => {
        if (response.success && response.data) {
          this.fashion = response.data;
        }
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set('Failed to load fashion: ' + err.message);
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (!this.fashion.title || !this.fashion.details || !this.fashion.style) {
      this.error.set('Please fill in all required fields');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    if (this.isEditMode()) {
      this.updateFashion();
    } else {
      this.createFashion();
    }
  }

  createFashion(): void {
    this.fashion.creationDate = new Date();
    
    this.fashionService.createFashion(this.fashion).subscribe({
      next: (response: { success: boolean; data?: Fashion; message?: string }) => {
        if (response.success) {
          alert('Fashion created successfully!');
          this.router.navigate(['/']);
        }
      },
      error: (err: Error) => {
        this.error.set('Failed to create fashion: ' + err.message);
        this.loading.set(false);
      }
    });
  }

  updateFashion(): void {
    this.fashionService.updateFashion(this.fashionId(), this.fashion).subscribe({
      next: (response: { success: boolean; message?: string }) => {
        if (response.success) {
          alert('Fashion updated successfully!');
          this.router.navigate(['/']);
        }
      },
      error: (err: Error) => {
        this.error.set('Failed to update fashion: ' + err.message);
        this.loading.set(false);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/300x400/CCCCCC/000000?text=No+Image';
  }
}
