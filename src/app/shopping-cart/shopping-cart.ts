import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity?: number;
  selected?: boolean;
}

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart implements OnInit {
  products: Product[] = [];
  cart: Product[] = [];
  showCart = false;
  message = '';

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCart();
  }

  loadProducts(): void {
    this.http.get<Product[]>(`${this.apiUrl}/products`, { withCredentials: true }).subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error loading products', err)
    });
  }

  loadCart(): void {
    this.http.get<Product[]>(`${this.apiUrl}/cart`, { withCredentials: true }).subscribe({
      next: (data) => this.cart = data.map(item => ({ ...item, selected: false })),
      error: (err) => console.error('Error loading cart', err)
    });
  }

  addToCart(product: Product): void {
    this.http.post<any>(`${this.apiUrl}/cart`, product, { withCredentials: true }).subscribe({
      next: (data) => {
        this.cart = data.cart.map((item: Product) => ({ ...item, selected: false }));
        this.message = `"${product.name}" added to cart!`;
        setTimeout(() => this.message = '', 2000);
      }
    });
  }

  removeSelected(): void {
    const toRemove = this.cart.filter(item => item.selected);
    if (toRemove.length === 0) return;
    // Remove each selected item one by one
    let remaining = toRemove.length;
    toRemove.forEach(item => {
      this.http.delete<any>(`${this.apiUrl}/cart/${item._id}`, { withCredentials: true }).subscribe({
        next: () => {
          remaining--;
          if (remaining === 0) this.loadCart();
        }
      });
    });
  }

  updateCart(): void {
    this.http.put<any>(`${this.apiUrl}/cart`, { cart: this.cart }, { withCredentials: true }).subscribe({
      next: (data) => {
        this.cart = data.cart.map((item: Product) => ({ ...item, selected: false }));
        this.message = 'Cart updated!';
        setTimeout(() => this.message = '', 2000);
      }
    });
  }

  toggleCartView(): void {
    this.showCart = !this.showCart;
    if (this.showCart) this.loadCart();
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  }

  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN') + ' ₫';
  }
}
