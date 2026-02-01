import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ex26Service } from '../services/ex26.service';

const FALLBACK_DATA = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SL1500_.jpg",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description: "From our Legends Collection, the Naga piece was inspired by the mythical water dragon that protects the ocean's pearl.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_SL1500_.jpg",
    rating: { rate: 4.6, count: 400 }
  }
];

@Component({
  selector: 'app-ex26',
  imports: [CommonModule],
  templateUrl: './ex26.html',
  styleUrl: './ex26.css',
})
export class Ex26 {
  data: any;
  errMessage: string = '';

  constructor(_service: Ex26Service) {
    console.log('Ex26 component initialized');
    _service.getEx26Data().subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.data = data;
      },
      error: (err) => {
        console.error('Error in component:', err);
        this.errMessage = err;
        this.data = FALLBACK_DATA;
      }
    });
  }
}
