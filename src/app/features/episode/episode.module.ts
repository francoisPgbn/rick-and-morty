import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeCardComponent } from './components/episode-card/episode-card.component';
import { EpisodeDetailsComponent } from './components/episode-details/episode-details.component';
import { EpisodeFilterComponent } from './components/episode-filter/episode-filter.component';
import { EpisodeListComponent } from './components/episode-list/episode-list.component';
import { EpisodeLayoutComponent } from './components/episode-layout/episode-layout.component';
import { NgxsModule } from '@ngxs/store';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { EpisodeState } from './store/episode.state';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NgxsModule.forFeature([EpisodeState]), SharedModule, AppRoutingModule],
  declarations: [EpisodeLayoutComponent, EpisodeCardComponent, EpisodeDetailsComponent, EpisodeFilterComponent, EpisodeListComponent],
  exports: [EpisodeLayoutComponent],
})
export class EpisodeModule {}
