import { Component, OnInit } from '@angular/core';
import { NotifyOnDestroy } from '../../../../shared/class/notifyOnDestroy';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { CharacterStateAction } from '../../action/character.action';
import { CharacterDetails, CharacterState, CharacterEpisode } from '../../store/character.state';
import { takeUntil } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
})
export class CharacterDetailsComponent extends NotifyOnDestroy implements OnInit {
  character: CharacterDetails | undefined;
  loading: boolean;
  episodeBySeason: Map<number, CharacterEpisode[]> = new Map<number, CharacterEpisode[]>();
  firstEpisodeName: string;
  firstEpisodeId: number;

  constructor(private store: Store, private route: ActivatedRoute, private location: Location) {
    super();
    this.route.params.subscribe((params) => {
      this.store.dispatch(new CharacterStateAction.GetCharacterDetails(params['id']));
    });
  }

  ngOnInit(): void {
    this.store
      .select(CharacterState.character)
      .pipe(takeUntil(this.destroy$))
      .subscribe((character) => {
        this.character = character;
        if (character) {
          character.episodes.forEach((value) => {
            if (this.episodeBySeason.get(value.code.season) === undefined) this.episodeBySeason.set(value.code.season, [value]);
            else this.episodeBySeason.set(value.code.season, this.episodeBySeason.get(value.code.season)!.concat(value));
          });

          if (this.episodeBySeason.size > 0){
             this.firstEpisodeName = this.episodeBySeason.entries().next().value[1][0].name;
             this.firstEpisodeId = this.episodeBySeason.entries().next().value[1][0].id;
            }
        }
      });

    this.store
      .select(CharacterState.loading)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.loading = value));
  }

  goBack() {
    this.location.back();
  }
}
