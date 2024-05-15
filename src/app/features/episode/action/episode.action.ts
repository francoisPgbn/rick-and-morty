import { EpisodeId } from '../../../shared/models/id.model';
import { FilterApplied } from '../store/episode.state';
// import { FilterApplied } from '../store/episode.state';

export namespace EpisodeStateAction {
  const CATEGORY = '[episode]';

  export class GetPage {
    static readonly type = `${CATEGORY} Get page`;
    constructor(public page: number) {}
  }

  export class GetEpisodeDetails {
    static readonly type = `${CATEGORY} Get episode`;
    constructor(public id: EpisodeId) {}
  }

  export class ApplyFilter {
    static readonly type = `${CATEGORY} Apply filter`;
    constructor(public filter: FilterApplied) {}
  }
}
