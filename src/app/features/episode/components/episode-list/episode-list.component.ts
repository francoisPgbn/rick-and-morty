import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { NotifyOnDestroy } from '../../../../shared/class/notifyOnDestroy';
import { EpisodeItem, EpisodeState } from '../../store/episode.state';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrl: './episode-list.component.scss'
})
export class EpisodeListComponent extends NotifyOnDestroy implements OnInit {
  @Input() currentPage: number;
  @Input() maxPage: number;

  episodes: EpisodeItem[] = [];
  count: number;

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store
      .select(EpisodeState.episodes)
      .pipe(takeUntil(this.destroy$))
      .subscribe((item) => (this.episodes = item));

    this.store
      .select(EpisodeState.info)
      .pipe(takeUntil(this.destroy$))
      .subscribe((info) => (this.count = info!.count));
  } 

}
