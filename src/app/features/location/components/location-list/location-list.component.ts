import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { NotifyOnDestroy } from '../../../../shared/class/notifyOnDestroy';
import { LocationItem, LocationState } from '../../store/location.state';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.scss'
})
export class LocationListComponent extends NotifyOnDestroy implements OnInit {
  @Input() currentPage: number;
  @Input() maxPage: number;

  locations: LocationItem[] = [];
  count: number;

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store
      .select(LocationState.locations)
      .pipe(takeUntil(this.destroy$))
      .subscribe((item) => (this.locations = item));

    this.store
      .select(LocationState.info)
      .pipe(takeUntil(this.destroy$))
      .subscribe((info) => (this.count = info!.count));
  } 

}
