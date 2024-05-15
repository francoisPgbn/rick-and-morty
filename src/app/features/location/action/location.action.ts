import { LocationId } from '../../../shared/models/id.model';
import { FilterApplied } from '../store/location.state';

export namespace LocationStateAction {
  const CATEGORY = '[location]';

  export class GetPage {
    static readonly type = `${CATEGORY} Get page`;
    constructor(public page: number) {}
  }

  export class GetLocationDetails {
    static readonly type = `${CATEGORY} Get location`;
    constructor(public id: LocationId) {}
  }

  export class ApplyFilter {
    static readonly type = `${CATEGORY} Apply filter`;
    constructor(public filter: FilterApplied) {} 
  }
}
