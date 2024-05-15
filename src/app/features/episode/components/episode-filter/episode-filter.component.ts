import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { NotifyOnDestroy } from '../../../../shared/class/notifyOnDestroy';
import { EpisodeStateAction } from '../../action/episode.action';
import { FilterApplied, EpisodeState } from '../../store/episode.state';

@Component({
  selector: 'app-episode-filter',
  templateUrl: './episode-filter.component.html',
  styleUrl: './episode-filter.component.scss'
})
export class EpisodeFilterComponent  extends NotifyOnDestroy implements OnInit {
  form: FormGroup = this.fb.group({
    name: [''],
    episode: [''],
  });

  filterApplied: FilterApplied;

  constructor(private fb: FormBuilder, private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store
      .select(EpisodeState.filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.filterApplied = value));
  }

  onSubmit() {
    var value = {
      name: this.form.value['name'],
      episode: this.form.value['episode']
    } satisfies FilterApplied; 

    this.store.dispatch(new EpisodeStateAction.ApplyFilter(value));
  }

  removeName() {
    this.form.patchValue({ name: '' });
    var value = {
      ...this.filterApplied,
      name: undefined,
    };
    this.store.dispatch(new EpisodeStateAction.ApplyFilter(value));
  }
  removeEpisode() {
    this.form.patchValue({ episode: '' });
    var value = {
      ...this.filterApplied,
      episode: undefined,
    };
    this.store.dispatch(new EpisodeStateAction.ApplyFilter(value));
  }
}
