import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ex19-product',
  imports: [RouterLink],
  templateUrl: './ex19-product.html',
  styleUrl: './ex19-product.css',
})
export class Ex19Product {
  title = 'ProductComponent';
  currentUrl = '/ex19-product';
}
