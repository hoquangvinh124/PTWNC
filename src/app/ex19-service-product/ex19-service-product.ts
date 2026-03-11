import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ex19-service-product',
  imports: [RouterLink],
  templateUrl: './ex19-service-product.html',
  styleUrl: './ex19-service-product.css',
})
export class Ex19ServiceProduct {
  title = 'ServiceProductComponent';
  currentUrl = '/ex19-service-product';
}
