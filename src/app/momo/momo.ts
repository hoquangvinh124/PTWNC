import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-momo',
  imports: [CommonModule, FormsModule],
  templateUrl: './momo.html',
  styleUrl: './momo.css',
})
export class Momo {
  amount: number = 10000;
  orderInfo: string = 'Thanh toán đơn hàng tại MyShop';
  loading: boolean = false;
  error: string = '';

  constructor(private http: HttpClient) { }

  pay(): void {
    if (this.amount < 1000) {
      this.error = 'Số tiền tối thiểu là 1,000 VNĐ';
      return;
    }
    this.loading = true;
    this.error = '';

    this.http.post<any>('/momo/create-payment', {
      amount: this.amount,
      orderInfo: this.orderInfo,
    }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.payUrl) {
          // Redirect user to MoMo payment page
          window.location.href = res.payUrl;
        } else {
          this.error = res.message || 'Không thể khởi tạo thanh toán MoMo';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Lỗi kết nối server: ' + err.message;
      },
    });
  }
}
