import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { AppRoutingModule } from '../../app-routing.module';
import { HomeButtonComponent } from './home-button/home-button.component';
@NgModule({
  imports: [CommonModule, AppRoutingModule],
  declarations: [HomeLayoutComponent, HomeButtonComponent],
  exports: [HomeLayoutComponent],
})
export class HomeModule {}
