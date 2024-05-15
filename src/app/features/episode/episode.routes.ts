import { RouterModule, Routes } from '@angular/router';
import { EpisodeLayoutComponent } from './components/episode-layout/episode-layout.component';
import { EpisodeDetailsComponent } from './components/episode-details/episode-details.component';

export const routes: Routes = [
  {
    path: 'episodes/:page',
    component: EpisodeLayoutComponent,
  },
  {
    path: 'episode/:id',
    component: EpisodeDetailsComponent,
  },
];

export const EpisodeRouting = RouterModule.forChild(routes);
