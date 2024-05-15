import { CharacterId } from '../id.model';
import { CharacterBaseUrl, EpisodeDetailsUrl, CharacterDetailsUrl, LocationDetailsUrl } from '../url.model';
import { Gender } from './gender.model';
import { Status } from './status.model';

export interface Character {
  id: CharacterId;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: Location;
  image: `${CharacterBaseUrl}/avatar/${number}.jpeg`;
  episode: EpisodeDetailsUrl[];
  url: CharacterDetailsUrl;
  created: string;
  location: Location;
}

export interface Location {
  name: string;
  url: LocationDetailsUrl;
}
