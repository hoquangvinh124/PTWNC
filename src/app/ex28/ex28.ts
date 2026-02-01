import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ex28Service } from '../services/ex28.service';

const FALLBACK_DATA = {
  "time": {
    "updated": "Mar 12, 2023 10:43:00 UTC",
    "updatedISO": "2023-03-12T10:43:00+00:00",
    "updateduk": "Mar 12, 2023 at 10:43 GMT"
  },
  "disclaimer": "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
  "chartName": "Bitcoin",
  "bpi": {
    "USD": {
      "code": "USD",
      "symbol": "$",
      "rate": "20,520.4346",
      "description": "United States Dollar",
      "rate_float": 20520.4346
    },
    "GBP": {
      "code": "GBP",
      "symbol": "£",
      "rate": "17,146.7110",
      "description": "British Pound Sterling",
      "rate_float": 17146.711
    },
    "EUR": {
      "code": "EUR",
      "symbol": "€",
      "rate": "19,989.8993",
      "description": "Euro",
      "rate_float": 19989.8993
    }
  }
};

@Component({
  selector: 'app-ex28',
  imports: [CommonModule],
  templateUrl: './ex28.html',
  styleUrl: './ex28.css',
})
export class Ex28 {
  data: any;

  constructor(private _service: Ex28Service) {
    console.log('Ex28 component initialized');
    this.fetchEx28Data();
  }

  fetchEx28Data() {
    console.log('Fetching Bitcoin data...');
    this._service.getEx28Data().subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.data = data;
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.data = FALLBACK_DATA;
      }
    });
  }
}
