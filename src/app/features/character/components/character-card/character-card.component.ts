import { Component, Input } from '@angular/core';
import { CharacterItem } from '../../store/character.state';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {

  @Input() character: CharacterItem;
}
