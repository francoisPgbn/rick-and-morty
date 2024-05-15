import { EpisodeId } from '../id.model';
import { CharacterDetailsUrl, EpisodeDetailsUrl } from '../url.model';

export interface Episode {
  id: EpisodeId;
  name: string;
  air_date: string;
  episode: `S${number}E${number}`;
  characters: CharacterDetailsUrl[];
  url: EpisodeDetailsUrl;
  created: string;
}
