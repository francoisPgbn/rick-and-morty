import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterLayoutComponent } from './components/character-layout/character-layout.component';
import { NgxsModule } from '@ngxs/store';
import { CharacterState } from './store/character.state';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterFilterComponent } from './components/character-filter/character-filter.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CharacterStatusComponent } from './components/character-status/character-status.component';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([CharacterState]),
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    CharacterLayoutComponent,
    CharacterListComponent,
    CharacterFilterComponent,
    CharacterCardComponent,
    CharacterDetailsComponent,
    CharacterStatusComponent,
  ],
  exports: [CharacterLayoutComponent],
})
export class CharacterModule {}
