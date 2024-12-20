import { RouterModule, Routes } from '@angular/router';
import { LocationLayoutComponent } from './components/location-layout/location-layout.component';
import { LocationDetailsComponent } from './components/location-details/location-details.component';

export const routes: Routes = [
  {
    path: 'locations/:page',
    component: LocationLayoutComponent,
    data: { animation: 'LocationListPage' },
  },
  {
    path: 'location/:id',
    component: LocationDetailsComponent,
    data: { animation: 'LocationDetailsPage' },
  }
];

export const LocationRouting = RouterModule.forChild(routes);
