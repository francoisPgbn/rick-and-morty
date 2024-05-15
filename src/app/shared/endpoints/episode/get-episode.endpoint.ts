import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ResponseWithError } from '../../class/responseWithError';
import { EpisodeId } from '../../models/id.model';
import { Episode } from '../../models/episode/episode.model';

export namespace GetEpisodeService {
  export interface Request {
    id: EpisodeId;
  }

  export interface Response extends Episode, ResponseWithError {}

  @Injectable({
    providedIn: 'root',
  })
  export class Endpoint {
    constructor(private http: HttpClient) {}

    send(request: Request): Observable<Response> {
      return this.http.get<Response>(`${environment.apiURl}/episode/${request.id}`);
    }
  }
}
