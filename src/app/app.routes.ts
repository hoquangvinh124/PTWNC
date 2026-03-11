import { Routes } from '@angular/router';
import { ListProduct } from './list-product/list-product';
import { ProductDetail } from './product-detail/product-detail';
import { NotFound } from './not-found/not-found';
import { Ex28 } from './ex28/ex28';
import { Ex27 } from './ex27/ex27';
import { Ex18 } from './ex18/ex18';
import { Ex13 } from './ex13/ex13';
import { Ex13Detail } from './ex13-detail/ex13-detail';
import { Ex19Product } from './ex19-product/ex19-product';
import { Ex19ListProduct } from './ex19-list-product/ex19-list-product';
import { Ex19ServiceProduct } from './ex19-service-product/ex19-service-product';
import { Ex26 } from './ex26/ex26';
import { Books } from './books/books';
import { BookDetail } from './book-detail/book-detail';
import { BookNew } from './book-new/book-new';
import { BookUpdate } from './book-update/book-update';
import { BookDelete } from './book-delete/book-delete';
import { FileUpload } from './file-upload/file-upload';
import { FashionDetailComponent } from './fashion-detail/fashion-detail';
import { Login } from './login/login';
import { ShoppingCart } from './shopping-cart/shopping-cart';
import { AdminFashionListComponent } from './admin-fashion-list/admin-fashion-list';
import { AdminFashionFormComponent } from './admin-fashion-form/admin-fashion-form';
import { FashionCatalogComponent } from './fashion-catalog/fashion-catalog';

export const routes: Routes = [
  { path: 'products', component: ListProduct },
  { path: 'sản-phẩm-1/:id', component: ProductDetail },
  { path: 'bitcoin', component: Ex28 },
  { path: 'ex27', component: Ex27 },
  { path: 'ex18', component: Ex18 },
  { path: 'ex13', component: Ex13 },
  { path: 'ex13/:id', component: Ex13Detail },
  { path: 'ex19-product', component: Ex19Product },
  { path: 'ex19-list-product', component: Ex19ListProduct },
  { path: 'ex19-service-product', component: Ex19ServiceProduct },
  { path: 'fake-products', component: Ex26 },
  { path: 'books', component: Books },
  { path: 'book-detail/:id', component: BookDetail },
  { path: 'book-detail', component: BookDetail },
  { path: 'book-new', component: BookNew },
  { path: 'book-update', component: BookUpdate },
  { path: 'book-delete', component: BookDelete },
  { path: 'file-upload', component: FileUpload },
  { path: 'fashion', component: FashionDetailComponent },
  { path: 'login', component: Login },
  { path: 'shopping-cart', component: ShoppingCart },

  // New Fashion System Routes
  { path: 'admin-fashion-list', component: AdminFashionListComponent },
  { path: 'admin-fashion-form', component: AdminFashionFormComponent },
  { path: 'admin-fashion-form/:id', component: AdminFashionFormComponent },
  { path: 'fashion-catalog', component: FashionCatalogComponent },
  { path: 'fashion-detail/:id', component: FashionDetailComponent },

  { path: '**', component: NotFound }
];
