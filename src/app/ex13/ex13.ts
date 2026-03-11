import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ex13Service } from '../services/ex13.service';

@Component({
  selector: 'app-ex13',
  imports: [CommonModule],
  templateUrl: './ex13.html',
  styleUrl: './ex13.css',
})
export class Ex13 {
  public products: any;

  constructor(private _fs: Ex13Service, private router: Router) {
    this.products = this._fs.getProductsWithImages();
  }

  viewDetail(f: any) {
    this.router.navigate(['ex13', f.ProductId]);
  }
}
