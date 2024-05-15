import { Component, Input } from '@angular/core';
import { LocationItem } from '../../store/location.state';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.scss',
})
export class LocationCardComponent {
  @Input() location: LocationItem;
}
