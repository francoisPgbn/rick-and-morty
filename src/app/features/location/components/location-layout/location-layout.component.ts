import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { LocationStateAction } from '../../action/location.action';
import { NotifyOnDestroy } from '../../../../shared/class/notifyOnDestroy';
import { takeUntil } from 'rxjs';
import { LocationState } from '../../store/location.state';

@Component({
  selector: 'app-location-layout',
  templateUrl: './location-layout.component.html',
  styleUrls: ['./location-layout.component.scss']
})
export class LocationLayoutComponent extends NotifyOnDestroy implements OnInit  {
  loading: boolean = true;
  currentPage: number = 1;
  maxPage: number = 1;
  displayPagination: boolean = false;
  
  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    super();
    this.route.params.subscribe((params) => {
      this.store.dispatch(new LocationStateAction.GetPage(params['page']));
    });
  }

  
  ngOnInit(): void {
    this.store
      .select(LocationState.loading)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value));

    this.store
      .select(LocationState.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.currentPage = value));

    this.store
      .select(LocationState.info)
      .pipe(takeUntil(this.destroy$))
      .subscribe((info) => {
        if (info) {
          this.maxPage = info.pages;
          this.displayPagination = !!info.next || !!info.prev;
        }
      });
  }

  loadNewPage(page: number) {
    this.router.navigate(['locations', page]);
  }
}
