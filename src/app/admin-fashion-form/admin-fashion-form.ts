import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FashionApiService } from '../services/fashion-api.service';
import { Fashion } from '../interfaces/Fashion';

@Component({
  selector: 'app-admin-fashion-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-fashion-form.html',
  styleUrls: ['./admin-fashion-form.css']
})
export class AdminFashionFormComponent implements OnInit {
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
    private fashionService: FashionApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Check if we're in edit mode
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode.set(true);
        this.fashionId.set(params['id']);
        this.submitButtonText.set('Update Fashion');
        this.loadFashion(params['id']);
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
      error: (error: Error) => {
        this.error.set('Failed to load fashion data');
        console.error('Error loading fashion:', error);
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    // Validate form
    if (!this.fashion.title || !this.fashion.details || !this.fashion.style) {
      alert('Please fill in all required fields (Title, Details, and Style)');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    if (this.isEditMode()) {
      // Update existing fashion
      this.fashionService.updateFashion(this.fashionId(), this.fashion).subscribe({
        next: (response: { success: boolean }) => {
          if (response.success) {
            alert('Fashion updated successfully!');
            this.router.navigate(['/admin-fashion-list']);
          }
          this.loading.set(false);
        },
        error: (error: Error) => {
          this.error.set('Failed to update fashion');
          alert('Failed to update fashion');
          console.error('Error updating fashion:', error);
          this.loading.set(false);
        }
      });
    } else {
      // Create new fashion
      this.fashion.creationDate = new Date();
      this.fashionService.createFashion(this.fashion).subscribe({
        next: (response: { success: boolean }) => {
          if (response.success) {
            alert('Fashion created successfully!');
            this.router.navigate(['/admin-fashion-list']);
          }
          this.loading.set(false);
        },
        error: (error: Error) => {
          this.error.set('Failed to create fashion');
          alert('Failed to create fashion');
          console.error('Error creating fashion:', error);
          this.loading.set(false);
        }
      });
    }
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      this.router.navigate(['/admin-fashion-list']);
    }
  }

  previewImage(): void {
    if (this.fashion.thumbnail) {
      window.open(this.fashion.thumbnail, '_blank');
    }
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/200x300/CCCCCC/FFFFFF?text=Invalid+Image';
  }
}
