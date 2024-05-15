import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../../models/character/character.model';
import { environment } from '../../../../environments/environment.development';
import { ResponseWithError } from '../../class/responseWithError';
import { EpisodeId } from '../../models/id.model';
import { Info } from '../../models/info.model';
import { Episode } from '../../models/episode/episode.model';

export namespace GetPageEpisodeService {
  export interface Request {
    page: number;
    name: string;
    episode: string;
  }

  export interface Response extends ResponseWithError {
    info: Info;
    results: Episode[];
  }

  @Injectable({
    providedIn: 'root',
  })
  export class Endpoint {
    constructor(private http: HttpClient) {}

    send(request: Request): Observable<Response> {
      return this.http.get<Response>(
        `${environment.apiURl}/episode/?page=${request.page}&name=${request.name}&episode=${request.episode}`
        // `${environment.apiURl}/episode/re`
      );
    }
  }
}
