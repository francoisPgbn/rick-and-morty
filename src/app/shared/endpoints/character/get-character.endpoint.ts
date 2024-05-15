import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../../models/character/character.model';
import { environment } from '../../../../environments/environment.development';
import { ResponseWithError } from '../../class/responseWithError';

export namespace GetCharacterService {
  export interface Request {
    id: number;
  }

  export interface Response extends Character, ResponseWithError {}

  @Injectable({
    providedIn: 'root',
  })
  export class Endpoint {
    constructor(private http: HttpClient) {}

    send(request: Request): Observable<Response> {
      return this.http.get<Response>(
        `${environment.apiURl}/character/${request.id}`
      );
    }
  }
}
