import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CharacterStateAction } from '../../action/character.action';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyOnDestroy } from '../../../../shared/class/notifyOnDestroy';
import { takeUntil } from 'rxjs';
import { CharacterState } from '../../store/character.state';

@Component({
  selector: 'app-character-layout',
  templateUrl: './character-layout.component.html',
  styleUrls: ['./character-layout.component.scss'],
})
export class CharacterLayoutComponent extends NotifyOnDestroy implements OnInit {
  loading: boolean = true;
  currentPage: number = 1;
  maxPage: number = 1;
  displayPagination: boolean = false;

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    super();
    this.route.params.subscribe((params) => {
      this.store.dispatch(new CharacterStateAction.GetPage(params['page']));
    });
  }

  ngOnInit(): void {
    this.store
      .select(CharacterState.loading)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value));

    this.store
      .select(CharacterState.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.currentPage = value));

    this.store
      .select(CharacterState.info)
      .pipe(takeUntil(this.destroy$))
      .subscribe((info) => {
        if (info) {
          this.maxPage = info.pages;
          this.displayPagination = !!info.next || !!info.prev;
        }
      });
  }

  loadNewPage(page: number) {
    this.router.navigate(['characters', page]);
  }
}
