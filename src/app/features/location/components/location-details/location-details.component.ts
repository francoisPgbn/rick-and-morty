import { Component, OnInit } from '@angular/core';
import { LocationDetails, LocationState } from '../../store/location.state';
import { NotifyOnDestroy } from '../../../../shared/class/notifyOnDestroy';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LocationStateAction } from '../../action/location.action';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrl: './location-details.component.scss',
})
export class LocationDetailsComponent extends NotifyOnDestroy implements OnInit {
  location: LocationDetails | undefined;
  loading: boolean;

  constructor(private store: Store, private route: ActivatedRoute, private loc: Location) {
    super();
    this.route.params.subscribe((params) => {
      this.store.dispatch(new LocationStateAction.GetLocationDetails(params['id']));
    });
  }

  ngOnInit(): void {
    this.store
      .select(LocationState.location)
      .pipe(takeUntil(this.destroy$))
      .subscribe((location) => {
        this.location = location;
      });

    this.store
      .select(LocationState.loading)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value));
  }

  goBack() {
    this.loc.back();
  }
}
