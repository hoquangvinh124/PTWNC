import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ex18',
  imports: [CommonModule],
  templateUrl: './ex18.html',
  styleUrl: './ex18.css',
})
export class Ex18 implements OnInit {
  private http = inject(HttpClient);
  customerGroups: any[] = [];

  ngOnInit(): void {
    this.http.get<any[]>('assets/data/customers.json').subscribe({
      next: (data) => {
        this.customerGroups = data;
      },
      error: (err) => {
        console.error('Error fetching customers', err);
      }
    });
  }
}
