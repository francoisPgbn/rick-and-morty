import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PaginationComponent } from './components/pagination/pagination.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ChipsComponent } from './components/chips/chips.component';
@NgModule({
  imports: [CommonModule],
  declarations: [PaginationComponent, DropdownComponent, ChipsComponent],
  exports: [PaginationComponent, DropdownComponent, ChipsComponent],
})
export class SharedModule {}
