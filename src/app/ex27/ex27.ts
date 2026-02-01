import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ex27Service } from '../services/ex27.service';

@Component({
  selector: 'app-ex27',
  imports: [CommonModule],
  templateUrl: './ex27.html',
  styleUrl: './ex27.css',
})
export class Ex27 {
  data: any;
  errMessage: string = '';

  constructor(private _service: Ex27Service) {
    console.log('Ex27 component initialized');
    this._service.getEx27Data().subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.data = data;
      },
      error: (err) => {
        console.error('Error in component:', err);
        this.errMessage = err;
      }
    });
  }
}
