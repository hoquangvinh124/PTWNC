import { Routes } from '@angular/router';
import { FashionListComponent } from './components/fashion-list/fashion-list.component';
import { FashionFormComponent } from './components/fashion-form/fashion-form.component';

export const routes: Routes = [
  { path: '', component: FashionListComponent },
  { path: 'new', component: FashionFormComponent },
  { path: 'edit/:id', component: FashionFormComponent },
  { path: 'view/:id', component: FashionFormComponent },
  { path: '**', redirectTo: '' }
];
