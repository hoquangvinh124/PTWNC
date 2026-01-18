import { Component } from '@angular/core';

@Component({
  selector: 'app-learnbiding',
  imports: [],
  templateUrl: './learnbiding.html',
  styleUrl: './learnbiding.css',
})
export class Learnbiding {
  student_id:string="S001";
  student_name:string="John Doe";
  student_address:string="123 Main St, Anytown";
  red_text_style = {color: 'red'};
}
