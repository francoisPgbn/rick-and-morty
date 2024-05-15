import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationLayoutComponent } from './components/location-layout/location-layout.component';
import { LocationCardComponent } from './components/location-card/location-card.component';
import { LocationDetailsComponent } from './components/location-details/location-details.component';
import { LocationFilterComponent } from './components/location-filter/location-filter.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LocationState } from './store/location.state';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NgxsModule.forFeature([LocationState]), SharedModule, AppRoutingModule],
  declarations: [LocationLayoutComponent, LocationCardComponent, LocationDetailsComponent, LocationFilterComponent, LocationListComponent],
  exports: [LocationLayoutComponent],
})
export class LocationModule {}
