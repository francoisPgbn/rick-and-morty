import { RouterModule, Routes } from '@angular/router';
import { CharacterLayoutComponent } from './components/character-layout/character-layout.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';

export const routes: Routes = [
  {
    path: 'characters/:page',
    component: CharacterLayoutComponent,
  },
  {
    path: 'character/:id',
    component: CharacterDetailsComponent,
  }
];

export const CharacterRouting = RouterModule.forChild(routes);
