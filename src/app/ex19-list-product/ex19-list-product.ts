import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ex19-list-product',
  imports: [RouterLink],
  templateUrl: './ex19-list-product.html',
  styleUrl: './ex19-list-product.css',
})
export class Ex19ListProduct {
  title = 'ListProductComponent';
  currentUrl = '/ex19-list-product';
}
