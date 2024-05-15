import { Component, Input, OnInit } from '@angular/core';
import { Status } from '../../../../shared/models/character/status.model';

@Component({
  selector: 'app-character-status',
  templateUrl: './character-status.component.html',
  styleUrl: './character-status.component.scss',
})
export class CharacterStatusComponent implements OnInit {
  @Input() status: Status;

  styleClass: any;

  ngOnInit(): void {
    {
      this.styleClass = {
        'character__card--chip': true,
        'green': this.status == Status.ALIVE,
        'red': this.status == Status.DEAD,
        'grey': this.status == Status.UNKNOWN,
      }
    }
  }
}
