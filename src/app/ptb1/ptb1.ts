import { Component } from '@angular/core';

@Component({
  selector: 'app-ptb1',
  imports: [],
  templateUrl: './ptb1.html',
  styleUrl: './ptb1.css',
})
export class Ptb1 {
  result: string = '';
  
  get_solution(hsa: HTMLInputElement, hsb: HTMLInputElement) {
    let a = parseFloat(hsa.value);
    let b = parseFloat(hsb.value);
    
    if (isNaN(a) || isNaN(b)) {
      this.result = 'Vui lòng nhập số hợp lệ';
    } else if (a === 0) {
      this.result = b === 0 ? 'Vô số nghiệm' : 'Vô nghiệm';
    } else {
      let x = -b / a;
      this.result = 'x = ' + x;
    }
  }
}
