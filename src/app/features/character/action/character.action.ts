import { CharacterId } from '../../../shared/models/id.model';
import { FilterApplied } from '../store/character.state';

export namespace CharacterStateAction {
  const CATEGORY = '[characters]';

  export class GetPage {
    static readonly type = `${CATEGORY} Get page`;
    constructor(public page: number) {}
  }

  export class GetCharacterDetails {
    static readonly type = `${CATEGORY} Get character`;
    constructor(public id: CharacterId) {}
  }

  export class ApplyFilter {
    static readonly type = `${CATEGORY} Apply filter`;
    constructor(public filter: FilterApplied) {}
  }
}
