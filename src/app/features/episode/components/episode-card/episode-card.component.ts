import { Component, Input } from '@angular/core';
import { EpisodeItem } from '../../store/episode.state';

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.scss',
})
export class EpisodeCardComponent {
  @Input() episode: EpisodeItem;
}
