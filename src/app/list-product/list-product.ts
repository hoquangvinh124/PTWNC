import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-product.html',
  styleUrl: './list-product.css',
})
export class ListProduct {
  products = [
    { ProductId: 'p1', ProductName: 'Peach Avocado Smoothie', Price: 100000, Image: 'https://www.simplotfood.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0dkgxhks0leg%2F7llDcpQxqyV49PFWvwwwCx%2F15ce409ef1edde61fa586f63263f5bdf%2FPeachAVOSmoothie.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { ProductId: 'p2', ProductName: 'Cranberry Orange Smoothie', Price: 300000, Image: 'https://www.simplotfood.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0dkgxhks0leg%2F01y4xunF93ZpNSiWVrdOCG%2Fb0e0e1f374ec1e946bd43293507e280c%2FCranBryOrangeSmoothie.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { ProductId: 'p3', ProductName: 'Choco Calada', Price: 200000, Image: 'https://www.simplotfood.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0dkgxhks0leg%2F5JFXhjkTGqTeGjVw8C5SH1%2Fc688d9013494f139bda28dbb0ae081ba%2FChocoColadaSmoothie.jpg%3Ffm%3Dwebp&w=3840&q=75' },
  ]
  constructor(private router: Router, private activerouter: ActivatedRoute) { }
  view_detail(pid: string) {
    alert("You have selected product " + pid);
    this.router.navigate(['sản-phẩm-1', pid]);
  }
}
