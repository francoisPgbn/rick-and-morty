import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { NotifyOnDestroy } from '../../../../shared/class/notifyOnDestroy';
import { EpisodeStateAction } from '../../action/episode.action';
import { EpisodeDetails, EpisodeState } from '../../store/episode.state';
import {Location} from '@angular/common';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrl: './episode-details.component.scss'
})
export class EpisodeDetailsComponent extends NotifyOnDestroy implements OnInit {
  episode: EpisodeDetails | undefined;
  loading: boolean;

  constructor(private store: Store, private route: ActivatedRoute, private location: Location) {
    super();
    this.route.params.subscribe((params) => {
      this.store.dispatch(new EpisodeStateAction.GetEpisodeDetails(params['id']));
    });
  }

  ngOnInit(): void {
    this.store
      .select(EpisodeState.episode)
      .pipe(takeUntil(this.destroy$))
      .subscribe((episode) => {
        this.episode = episode;
      });

    this.store
      .select(EpisodeState.loading)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value));
  }

  goBack() {
    this.location.back();
  }
}
