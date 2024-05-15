import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { NotifyOnDestroy } from '../../../../shared/class/notifyOnDestroy';
import { LocationStateAction } from '../../action/location.action';
import { FilterApplied, LocationState } from '../../store/location.state';

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  styleUrl: './location-filter.component.scss',
})
export class LocationFilterComponent extends NotifyOnDestroy implements OnInit {
  form: FormGroup = this.fb.group({
    name: [''],
    dimension: [''],
    type: [''],
  });

  filterApplied: FilterApplied;

  constructor(private fb: FormBuilder, private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store
      .select(LocationState.filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.filterApplied = value));
  }

  onSubmit() {
    var value = {
      name: this.form.value['name'],
      dimension: this.form.value['dimension'],
      type: this.form.value['type'],
    } satisfies FilterApplied;
    console.log(value);

    this.store.dispatch(new LocationStateAction.ApplyFilter(value));
  }

  removeName() {
    this.form.patchValue({ name: '' });
    var value = {
      ...this.filterApplied,
      name: undefined,
    };
    this.store.dispatch(new LocationStateAction.ApplyFilter(value));
  }
  removeDimension() {
    this.form.patchValue({ dimension: '' });
    var value = {
      ...this.filterApplied,
      dimension: undefined,
    };
    this.store.dispatch(new LocationStateAction.ApplyFilter(value));
  }
  removeType() {
    this.form.patchValue({ type: '' });
    var value = {
      ...this.filterApplied,
      type: undefined,
    };
    this.store.dispatch(new LocationStateAction.ApplyFilter(value));
  }
}
