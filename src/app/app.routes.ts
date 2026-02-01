import { Routes } from '@angular/router';
import { ListProduct } from './list-product/list-product';
import { ProductDetail } from './product-detail/product-detail';
import { NotFound } from './not-found/not-found';
import { Ex28 } from './ex28/ex28';
import { Ex27 } from './ex27/ex27';
import { Ex26 } from './ex26/ex26';

export const routes: Routes = [
  { path: 'products', component: ListProduct },
  { path: 'sản-phẩm-1/:id', component: ProductDetail },
  { path: 'bitcoin', component: Ex28 },
  { path: 'ex27', component: Ex27 },
  { path: 'fake-products', component: Ex26 },
  { path: '**', component: NotFound }
];
