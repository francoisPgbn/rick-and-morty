import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CharacterStateAction } from '../../action/character.action';
import { DropdownItem } from '../../../../shared/components/dropdown/dropdown.component';
import { NotifyOnDestroy } from '../../../../shared/class/notifyOnDestroy';
import { CharacterState, FilterApplied } from '../../store/character.state';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-character-filter',
  templateUrl: './character-filter.component.html',
  styleUrl: './character-filter.component.scss',
})
export class CharacterFilterComponent
  extends NotifyOnDestroy
  implements OnInit
{
  form: FormGroup = this.fb.group({
    name: [''],
    species: [''],
    type: [''],
    gender: [''],
    status: [''],
  });

  statusDD: DropdownItem[] = [
    { label: '-', value: '-' },
    { label: 'Alive', value: 'Alive' },
    { label: 'Dead', value: 'Dead' },
    { label: 'Unknown', value: 'Unknown' },
  ];

  genderDD: DropdownItem[] = [
    { label: '-', value: '-' },
    { label: 'Female', value: 'Female' },
    { label: 'Male', value: 'Male' },
    { label: 'Genderless', value: 'Genderless' },
    { label: 'Unknown', value: 'Unknown' },
  ];

  filterApplied: FilterApplied;

  constructor(private fb: FormBuilder, private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store
      .select(CharacterState.filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.filterApplied = value));
  }

  onSubmit() {
    var value = {
      name: this.form.value['name'],
      species: this.form.value['species'],
      gender: this.form.value['gender'],
      status: this.form.value['status'],
      type: this.form.value['type'],
    } satisfies FilterApplied;
    console.log(value);

    this.store.dispatch(new CharacterStateAction.ApplyFilter(value));
  }

  removeName() {
    this.form.patchValue({ name: '' });
    var value = {
      ...this.filterApplied,
      name: undefined,
    };
    this.store.dispatch(new CharacterStateAction.ApplyFilter(value));
  }
  removeSpecies() {
    this.form.patchValue({ species: '' });
    var value = {
      ...this.filterApplied,
      species: undefined,
    };
    this.store.dispatch(new CharacterStateAction.ApplyFilter(value));
  }
  removeGender() {
    this.form.patchValue({ gender: '' });
    var value = {
      ...this.filterApplied,
      gender: undefined,
    };
    this.store.dispatch(new CharacterStateAction.ApplyFilter(value));
  }
  removeStatus() {
    this.form.patchValue({ status: '' });
    var value = {
      ...this.filterApplied,
      status: undefined,
    };
    this.store.dispatch(new CharacterStateAction.ApplyFilter(value));
  }
  removeType() {
    this.form.patchValue({ type: '' });
    var value = {
      ...this.filterApplied,
      type: undefined,
    };
    this.store.dispatch(new CharacterStateAction.ApplyFilter(value));
  }
}
