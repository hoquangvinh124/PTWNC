import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogService } from '../catalog';

@Component({
  selector: 'app-catalog',
  imports: [CommonModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog {
  categories: any[] = [];

  constructor(private catalogService: CatalogService) {
    this.categories = this.catalogService.getCategories();
  }

}
