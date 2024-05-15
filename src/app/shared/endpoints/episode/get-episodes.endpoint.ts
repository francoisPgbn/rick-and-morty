import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ResponseWithError } from '../../class/responseWithError';
import { Episode } from '../../models/episode/episode.model';

export namespace GetEpisodesService {
  export interface Request {
    ids: number[];
  }

  export interface Response extends Episode, Array<Episode>, ResponseWithError {}


  @Injectable({
    providedIn: 'root',
  })
  export class Endpoint {
    constructor(private http: HttpClient) {}

    send(request: Request): Observable<Response> {
      return this.http.get<Response>(
        `${environment.apiURl}/episode/${request.ids.join(',')}`
        // `${environment.apiURl}/episode/re`
      );
    }
  }
}
