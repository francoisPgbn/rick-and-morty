import { Injectable } from '@angular/core';
import { Info } from '../../../shared/models/info.model';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Observable, first, switchMap, tap } from 'rxjs';
import { GetEpisodesService } from '../../../shared/endpoints/episode/get-episodes.endpoint';
import { CharacterId, EpisodeId } from '../../../shared/models/id.model';
import { CharacterBaseUrl } from '../../../shared/models/url.model';
import { patch, append } from '@ngxs/store/operators';
import { GetCharactersService } from '../../../shared/endpoints/character/get-characters.endpoint';
import { Character } from '../../../shared/models/character/character.model';
import { GetEpisodeService } from '../../../shared/endpoints/episode/get-episode.endpoint';
import { EpisodeStateAction } from '../action/episode.action';
import { GetPageEpisodeService } from '../../../shared/endpoints/episode/get-page-episodes.endpoint';

export interface EpisodeCharacter {
  id: CharacterId;
  name: string;
  image: `${CharacterBaseUrl}/avatar/${number}.jpeg`;
}

export interface EpisodeDetails {
  id: EpisodeId;
  name: string;
  air_date: string;
  episode: `S${number}E${number}`;
  characters: EpisodeCharacter[];
}

export interface EpisodeItem {
  id: EpisodeId;
  name: string;
  air_date: string;
  episode: `S${number}E${number}`;
  characters: number;
}

export interface FilterApplied {
  episode: string | undefined;
  name: string | undefined;
}

export interface EpisodeStateModel {
  currentPage: number;
  info: Info | undefined;
  episodes: EpisodeItem[];
  loading: boolean;
  filter: FilterApplied;
  error: boolean;
  episode: EpisodeDetails | undefined;
}

@State({
  name: 'episodes',
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
export class EpisodeState {
  constructor(
    private getPageEndpoint: GetPageEpisodeService.Endpoint,
    private getEpisodesEndpoint: GetEpisodesService.Endpoint,
    private getEpisodeEndpoint: GetEpisodeService.Endpoint,
    private getCharactersEndpoint: GetCharactersService.Endpoint
  ) {}

  //#region Action
  @Action(EpisodeStateAction.GetPage)
  GetPage(ctx: StateContext<EpisodeStateModel>, action: EpisodeStateAction.GetPage): Observable<unknown> {
    ctx.patchState({ loading: true, error: false });
    var state = ctx.getState();

    var payload = {
      page: action.page,
      name: state.filter.name ?? '',
      episode: state.filter.episode ?? '',
    } satisfies GetPageEpisodeService.Request;

    return this.sendGetPageRequest(payload, ctx);
  }

  @Action(EpisodeStateAction.ApplyFilter)
  ApplyFilter(ctx: StateContext<EpisodeStateModel>, action: EpisodeStateAction.ApplyFilter): Observable<unknown> {
    ctx.patchState({
      loading: true,
      error: false,
      filter: action.filter,
    });
    var state = ctx.getState();

    var payload = {
      page: 1,
      name: state.filter.name ?? '',
      episode: state.filter.episode ?? '',
    } satisfies GetPageEpisodeService.Request;

    return this.sendGetPageRequest(payload, ctx);
  }

  @Action(EpisodeStateAction.GetEpisodeDetails)
  GetEpisodeDetails(ctx: StateContext<EpisodeStateModel>, action: EpisodeStateAction.GetEpisodeDetails): Observable<unknown> {
    ctx.patchState({
      loading: true,
      error: false,
      episode: undefined,
    });

    var payload = {
      id: action.id,
    } satisfies GetEpisodeService.Request;

    return this.getEpisodeEndpoint.send(payload).pipe(
      first(),
      switchMap((response: GetEpisodeService.Response) => {
        if (response.error) {
          ctx.patchState({ loading: false, error: true });
        } else
          ctx.patchState({
            episode: {
              id: response.id,
              name: response.name,
              air_date: response.air_date,
              episode: response.episode,
              characters: [],
            } satisfies EpisodeDetails,
          });

        var residentsPayload = {
          ids: response.characters.map((item) => Number(item.split('/').pop()!)),
        } satisfies GetCharactersService.Request;

        return this.getCharactersEndpoint.send(residentsPayload).pipe(
          first(),
          tap((response) => {
            let residents = residentsPayload.ids.length === 1 ? [response as unknown as Character] : (response as unknown as Character[]);

            ctx.setState(
              patch({
                episode: patch({
                  characters: append(
                    residents.map((item) => {
                      return {
                        id: item.id,
                        name: item.name,
                        image: item.image,
                      } satisfies EpisodeCharacter;
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

  private sendGetPageRequest = (request: GetPageEpisodeService.Request, ctx: StateContext<EpisodeStateModel>): Observable<unknown> => {
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
            episodes: response.results.map((item) => {
              return {
                id: item.id as EpisodeId,
                name: item.name,
                episode: item.episode,
                air_date: item.air_date,
                characters: item.characters.length,
              } satisfies EpisodeItem;
            }),
          });
      })
    );
  };

  //#endregion

  //#region Selector
  @Selector()
  static filter(state: EpisodeStateModel): FilterApplied {
    return state.filter;
  }

  @Selector()
  static episode(state: EpisodeStateModel): EpisodeDetails | undefined {
    return state.episode;
  }

  @Selector()
  static episodes(state: EpisodeStateModel): EpisodeItem[] {
    return state.episodes;
  }

  @Selector()
  static info(state: EpisodeStateModel): Info | undefined {
    return state.info;
  }

  @Selector()
  static loading(state: EpisodeStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static currentPage(state: EpisodeStateModel): number {
    return state.currentPage;
  }
  //#endregion
}
