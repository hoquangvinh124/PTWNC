import { Routes } from '@angular/router';
import { FashionCatalogComponent } from './components/fashion-catalog/fashion-catalog.component';
import { FashionDetailComponent } from './components/fashion-detail/fashion-detail.component';

export const routes: Routes = [
  { path: '', component: FashionCatalogComponent },
  { path: 'detail/:id', component: FashionDetailComponent },
  { path: '**', redirectTo: '' }
];
