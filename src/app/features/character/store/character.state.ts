import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Gender } from '../../../shared/models/character/gender.model';
import { Info } from '../../../shared/models/info.model';
import { Status } from '../../../shared/models/character/status.model';
import { Injectable } from '@angular/core';
import { CharacterStateAction } from '../action/character.action';
import { EMPTY, Observable, finalize, first, switchMap, tap } from 'rxjs';
import { GetPageCharactersService } from '../../../shared/endpoints/character/get-page-character.endpoint';
import { CharacterId, EpisodeId, LocationId } from '../../../shared/models/id.model';
import { EpisodeDetailsUrl } from '../../../shared/models/url.model';
import { GetCharacterService } from '../../../shared/endpoints/character/get-character.endpoint';
import { GetEpisodesService } from '../../../shared/endpoints/episode/get-episodes.endpoint';
import { Location } from '../../../shared/models/character/character.model';
import { append, patch, updateItem } from '@ngxs/store/operators';
import { Code, GetCode } from '../../../shared/models/episode/code.model';
import { Episode } from '../../../shared/models/episode/episode.model';

export interface FilterApplied {
  status: Status | undefined;
  gender: Gender | undefined;
  type: string | undefined;
  species: string | undefined;
  name: string | undefined;
}

export interface CharacterLocation {
  id: LocationId;
  name: string;
}

export interface CharacterEpisode {
  id: EpisodeId;
  url: EpisodeDetailsUrl;
  name: string;
  code: Code;
}

export interface CharacterDetails {
  id: CharacterId;
  name: string;
  status: Status;
  gender: Gender;
  type: string;
  image: string;
  species: string;
  origin: CharacterLocation;
  location: CharacterLocation;
  episodes: CharacterEpisode[];
}

export interface CharacterItem {
  id: CharacterId;
  name: string;
  status: Status;
  gender: Gender;
  type: string;
  image: string;
  species: string;
}

export interface CharactersStateModel {
  currentPage: number;
  info: Info | undefined;
  characters: CharacterItem[];
  loading: boolean;
  filter: FilterApplied;
  error: boolean;
  character: CharacterDetails | undefined;
}

@State({
  name: 'characters',
  defaults: {
    currentPage: 1,
    loading: true,
    info: undefined,
    characters: [],
    filter: {},
    error: false,
    character: undefined,
  },
})
@Injectable()
export class CharacterState {
  constructor(
    private getPageEndpoint: GetPageCharactersService.Endpoint,
    private getEpisodesEndpoint: GetEpisodesService.Endpoint,
    private getCharacterEndpoint: GetCharacterService.Endpoint
  ) {}

  //#region Action
  @Action(CharacterStateAction.GetPage)
  GetPage(ctx: StateContext<CharactersStateModel>, action: CharacterStateAction.GetPage): Observable<unknown> {
    ctx.patchState({ loading: true, error: false });
    var state = ctx.getState();

    var payload = {
      page: action.page,
      name: state.filter.name ?? '',
      type: state.filter.type ?? '',
      status: state.filter.status ?? '',
      species: state.filter.species ?? '',
      gender: state.filter.gender ?? '',
    } satisfies GetPageCharactersService.Request;

    return this.sendGetPageRequest(payload, ctx);
  }

  @Action(CharacterStateAction.ApplyFilter)
  ApplyFilter(ctx: StateContext<CharactersStateModel>, action: CharacterStateAction.ApplyFilter): Observable<unknown> {
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
      status: state.filter.status ?? '',
      species: state.filter.species ?? '',
      gender: state.filter.gender ?? '',
    } satisfies GetPageCharactersService.Request;

    return this.sendGetPageRequest(payload, ctx);
  }

  @Action(CharacterStateAction.GetCharacterDetails)
  GetCharacterDetails(ctx: StateContext<CharactersStateModel>, action: CharacterStateAction.GetCharacterDetails): Observable<unknown> {
    ctx.patchState({
      loading: true,
      error: false,
      character: undefined,
    });

    var payload = {
      id: action.id,
    } satisfies GetCharacterService.Request;

    return this.getCharacterEndpoint.send(payload).pipe(
      first(),
      switchMap((response: GetCharacterService.Response) => {
        if (response.error) {
          ctx.patchState({ loading: false, error: true });
        } else
          ctx.patchState({
            character: {
              id: response.id,
              gender: response.gender,
              image: response.image,
              name: response.name,
              location: {
                name: response.location.name,
                id: Number(response.location.url.split('/').pop()!),
              } satisfies CharacterLocation,
              type: response.type,
              status: response.status,
              species: response.species,
              origin: {
                name: response.origin.name,
                id: Number(response.origin.url.split('/').pop()!),
              } satisfies CharacterLocation,
              episodes: [],
            } satisfies CharacterDetails,
          });

        var episodesPayload = {
          ids: response.episode.map((item) => Number(item.split('/').pop()!)),
        } satisfies GetEpisodesService.Request;

        return this.getEpisodesEndpoint.send(episodesPayload).pipe(
          first(),
          tap((response) => {
            let episodes = episodesPayload.ids.length === 1 ? [response as unknown as Episode] : (response as unknown as Episode[]);

            ctx.setState(
              patch({
                character: patch({
                  episodes: append(
                    episodes.map((item) => {
                      return {
                        id: item.id,
                        name: item.name,
                        url: item.url,
                        code: GetCode(item.episode),
                      } satisfies CharacterEpisode;
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

  private sendGetPageRequest = (request: GetPageCharactersService.Request, ctx: StateContext<CharactersStateModel>): Observable<unknown> => {
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
            characters: response.results.map((item) => {
              return {
                id: item.id as CharacterId,
                name: item.name,
                status: item.status,
                gender: item.gender,
                image: item.image,
                type: item.type,
                species: item.species,
              } satisfies CharacterItem;
            }),
          });
      })
    );
  };

  //#endregion

  //#region Selector
  @Selector()
  static filter(state: CharactersStateModel): FilterApplied {
    return state.filter;
  }

  @Selector()
  static character(state: CharactersStateModel): CharacterDetails | undefined {
    return state.character;
  }

  @Selector()
  static characters(state: CharactersStateModel): CharacterItem[] {
    return state.characters;
  }

  @Selector()
  static info(state: CharactersStateModel): Info | undefined {
    return state.info;
  }

  @Selector()
  static loading(state: CharactersStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static currentPage(state: CharactersStateModel): number {
    return state.currentPage;
  }
  //#endregion
}
