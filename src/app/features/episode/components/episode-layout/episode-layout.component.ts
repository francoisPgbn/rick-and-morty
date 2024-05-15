import { Component, OnInit } from '@angular/core';
import { EpisodeState } from '../../store/episode.state';
import { EpisodeStateAction } from '../../action/episode.action';
import { NotifyOnDestroy } from '../../../../shared/class/notifyOnDestroy';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-episode-layout',
  templateUrl: './episode-layout.component.html',
  styleUrl: './episode-layout.component.scss'
})
export class EpisodeLayoutComponent  extends NotifyOnDestroy implements OnInit  {
  loading: boolean = true;
  currentPage: number = 1;
  maxPage: number = 1;
  displayPagination: boolean = false;
  
  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    super();
    this.route.params.subscribe((params) => {
      this.store.dispatch(new EpisodeStateAction.GetPage(params['page']));
    });
  }

  
  ngOnInit(): void {
    this.store
      .select(EpisodeState.loading)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value));

    this.store
      .select(EpisodeState.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.currentPage = value));

    this.store
      .select(EpisodeState.info)
      .pipe(takeUntil(this.destroy$))
      .subscribe((info) => {
        if (info) {
          this.maxPage = info.pages;
          this.displayPagination = !!info.next || !!info.prev;
        }
      });
  }

  loadNewPage(page: number) {
    this.router.navigate(['episodes', page]);
  }
}
