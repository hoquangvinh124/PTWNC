import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FashionAPIService } from '../fashion-api';
import { IFashion } from '../interfaces/Fashion';

@Component({
  selector: 'app-fashion-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './fashion-detail.html',
  styleUrl: './fashion-detail.css',
})
export class FashionDetailComponent {
  fashion: IFashion | null = null;
  errMessage: string = '';
  fashionId: string = '640b187e71d9faa9039ff97d';

  constructor(private _service: FashionAPIService) { }

  searchFashion() {
    this._service.getFashion(this.fashionId).subscribe({
      next: (data) => {
        this.fashion = data;
        this.errMessage = '';
      },
      error: (err) => {
        this.errMessage = err;
        this.fashion = null;
      }
    });
  }
}
