import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    data: { animation: 'HomePage' },
  },
];

export const HomeRouting = RouterModule.forChild(routes);
