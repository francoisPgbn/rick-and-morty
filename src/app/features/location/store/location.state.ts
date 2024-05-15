import { Injectable } from '@angular/core';
import { Info } from '../../../shared/models/info.model';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Observable, first, switchMap, tap } from 'rxjs';
import { GetEpisodesService } from '../../../shared/endpoints/episode/get-episodes.endpoint';
import { GetLocationsService } from '../../../shared/endpoints/location/get-locations.endpoint';
import { CharacterId, LocationId } from '../../../shared/models/id.model';
import { LocationStateAction } from '../action/location.action';
import { CharacterBaseUrl } from '../../../shared/models/url.model';
import { patch, append } from '@ngxs/store/operators';
import { GetLocationService } from '../../../shared/endpoints/location/get-location.endpoint';
import { GetCode } from '../../../shared/models/episode/code.model';
import { Episode } from '../../../shared/models/episode/episode.model';
import { GetPageCharactersService } from '../../../shared/endpoints/character/get-page-character.endpoint';
import { GetCharactersService } from '../../../shared/endpoints/character/get-characters.endpoint';
import { Character } from '../../../shared/models/character/character.model';

export interface Resident {
  id: CharacterId;
  name: string;
  image: `${CharacterBaseUrl}/avatar/${number}.jpeg`;
}

export interface LocationDetails {
  id: LocationId;
  name: string;
  type: string;
  dimension: string;
  resident: Resident[];
}

export interface LocationItem {
  id: LocationId;
  name: string;
  type: string;
  dimension: string;
  count: number;
}

export interface FilterApplied {
  type: string | undefined;
  dimension: string | undefined;
  name: string | undefined;
}

export interface LocationsStateModel {
  currentPage: number;
  info: Info | undefined;
  locations: LocationItem[];
  loading: boolean;
  filter: FilterApplied;
  error: boolean;
  location: LocationDetails | undefined;
}

@State({
  name: 'locations',
  defaults: {
    currentPage: 1,
    loading: true,
    info: undefined,
    locations: [],
    filter: {},
    error: false,
    location: undefined,
  },
})
@Injectable()
export class LocationState {
  constructor(
    private getPageEndpoint: GetLocationsService.Endpoint,
    private getLocationEndpoint: GetLocationService.Endpoint,
    private getCharactersEndpoint: GetCharactersService.Endpoint
  ) {}

  //#region Action
  @Action(LocationStateAction.GetPage)
  GetPage(ctx: StateContext<LocationsStateModel>, action: LocationStateAction.GetPage): Observable<unknown> {
    ctx.patchState({ loading: true, error: false });
    var state = ctx.getState();

    var payload = {
      page: action.page,
      name: state.filter.name ?? '',
      type: state.filter.type ?? '',
      dimension: state.filter.dimension ?? '',
    } satisfies GetLocationsService.Request;

    return this.sendGetPageRequest(payload, ctx);
  }

  @Action(LocationStateAction.ApplyFilter)
  ApplyFilter(ctx: StateContext<LocationsStateModel>, action: LocationStateAction.ApplyFilter): Observable<unknown> {
    ctx.patchState({
      loading: true,
      error: false,
      filter: action.filter,
    });
    var state = ctx.getState();

    var payload = {
      page: 1,
      name: state.filter.name ?? '',
      type: state.filter.type ?? '',
      dimension: state.filter.dimension ?? '',
    } satisfies GetLocationsService.Request;

    return this.sendGetPageRequest(payload, ctx);
  }

  @Action(LocationStateAction.GetLocationDetails)
  GetLocationDetails(ctx: StateContext<LocationsStateModel>, action: LocationStateAction.GetLocationDetails): Observable<unknown> {
    ctx.patchState({
      loading: true,
      error: false,
      location: undefined,
    });

    var payload = {
      id: action.id,
    } satisfies GetLocationService.Request;

    return this.getLocationEndpoint.send(payload).pipe(
      first(),
      switchMap((response: GetLocationService.Response) => {
        if (response.error) {
          ctx.patchState({ loading: false, error: true });
        } else
          ctx.patchState({
            location: {
              id: response.id,
              name: response.name,
              type: response.type,
              dimension: response.dimension,
              resident: [],
            } satisfies LocationDetails,
          });

        var residentsPayload = {
          ids: response.residents.map((item) => Number(item.split('/').pop()!)),
        } satisfies GetCharactersService.Request;

        return this.getCharactersEndpoint.send(residentsPayload).pipe(
          first(),
          tap((response) => {
            let residents = residentsPayload.ids.length === 1 ? [response as unknown as Character] : (response as unknown as Character[]);

            ctx.setState(
              patch({
                location: patch({
                  resident: append(
                    residents.map((item) => {
                      return {
                        id: item.id,
                        name: item.name,
                        image: item.image, 
                      } satisfies Resident;
                    })
                  ),
                }),
              })
            );
          })
        );
      })
    );
  }

  //#endregion

  //#region Helper

  private sendGetPageRequest = (request: GetLocationsService.Request, ctx: StateContext<LocationsStateModel>): Observable<unknown> => {
    return this.getPageEndpoint.send(request).pipe(
      first(),
      tap((response) => {
        if (response.error) {
          ctx.patchState({ loading: false, error: true });
        } else
          ctx.patchState({
            currentPage: request.page,
            loading: false,
            info: response.info,
            locations: response.results.map((item) => {
              return {
                id: item.id as LocationId,
                name: item.name,
                type: item.type,
                dimension: item.dimension,
                count: item.residents.length,
              } satisfies LocationItem;
            }),
          });
      })
    );
  };

  //#endregion

  //#region Selector
  @Selector()
  static filter(state: LocationsStateModel): FilterApplied {
    return state.filter;
  }

    @Selector()
    static location(state: LocationsStateModel): LocationDetails | undefined {
      return state.location;
    }

  @Selector()
  static locations(state: LocationsStateModel): LocationItem[] {
    return state.locations;
  }

  @Selector()
  static info(state: LocationsStateModel): Info | undefined {
    return state.info;
  }

  @Selector()
  static loading(state: LocationsStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static currentPage(state: LocationsStateModel): number {
    return state.currentPage;
  }
  //#endregion
}
