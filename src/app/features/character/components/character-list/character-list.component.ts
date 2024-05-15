import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { NotifyOnDestroy } from '../../../../shared/class/notifyOnDestroy';
import { CharacterItem, CharacterState } from '../../store/character.state';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent extends NotifyOnDestroy implements OnInit {
  @Input() currentPage: number;
  @Input() maxPage: number;
  
  characters: CharacterItem[] = [];
  count: number;

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.store
      .select(CharacterState.characters)
      .pipe(takeUntil(this.destroy$))
      .subscribe((item) => (this.characters = item));

    this.store
      .select(CharacterState.info)
      .pipe(takeUntil(this.destroy$))
      .subscribe((info) => (this.count = info!.count));
  }
}
