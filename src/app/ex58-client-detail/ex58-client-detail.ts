import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ex58Service } from '../services/ex58.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-ex58-client-detail',
  imports: [CommonModule],
  templateUrl: './ex58-client-detail.html',
  styleUrl: './ex58-client-detail.css',
})
export class Ex58ClientDetail implements OnInit {
  fashion: any = null;
  safeDetails: SafeHtml = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: Ex58Service,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    if (id) {
      this.service.getById(id).subscribe({
        next: (data) => {
          this.fashion = data;
          this.safeDetails = this.sanitizer.bypassSecurityTrustHtml(data.details || '');
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/ex58-client-list']);
  }
}
