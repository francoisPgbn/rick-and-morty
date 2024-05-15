import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRouting } from './features/home/home.routes';
import { LocationRouting } from './features/location/location.routes';
import { EpisodeRouting } from './features/episode/episode.routes';
import { CharacterRouting } from './features/character/character.routes';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeRouting,
    LocationRouting,
    EpisodeRouting,
    CharacterRouting,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
