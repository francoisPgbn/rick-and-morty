import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss'
})
export class ChipsComponent {
  @Input() text: string;

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  remove = () => this.onClick.emit();

}
