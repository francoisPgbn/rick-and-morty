import { LocationId } from '../id.model';
import { CharacterDetailsUrl, LocationDetailsUrl } from '../url.model';

export interface Location {
  id: LocationId;
  name: string;
  type: string;
  dimension: string;
  residents: CharacterDetailsUrl[];
  url: LocationDetailsUrl;
  created: string;
}
