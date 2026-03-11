import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-momo-result',
  imports: [CommonModule],
  templateUrl: './momo-result.html',
  styleUrl: './momo-result.css',
})
export class MomoResult implements OnInit {
  resultCode: string = '';
  orderId: string = '';
  amount: string = '';
  orderInfo: string = '';
  transId: string = '';
  message: string = '';
  success: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.resultCode = params['resultCode'] || '';
      this.orderId = params['orderId'] || '';
      this.amount = params['amount'] || '';
      this.orderInfo = params['orderInfo'] || '';
      this.transId = params['transId'] || '';
      this.message = params['message'] || '';
      // resultCode === '0' means success
      this.success = this.resultCode === '0';
    });
  }

  goBack(): void {
    this.router.navigate(['/momo']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
