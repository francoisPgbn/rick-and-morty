import { Component, Input } from '@angular/core';
import { CharacterItem } from '../../store/character.state';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {

  @Input() character: CharacterItem;
}
