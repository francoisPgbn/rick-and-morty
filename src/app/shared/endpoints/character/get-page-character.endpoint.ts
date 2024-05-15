import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../../models/character/character.model';
import { environment } from '../../../../environments/environment.development';
import { Info } from '../../models/info.model'; 
import { ResponseWithError } from '../../class/responseWithError';

export namespace GetPageCharactersService {
  export interface Request {
    page: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
  }

  export interface Response extends ResponseWithError {
    info: Info;
    results: Character[]; 
  }

  @Injectable({
    providedIn: 'root',
  })
  export class Endpoint {
    constructor(private http: HttpClient) {}

    send(request: Request): Observable<Response> {
      return this.http.get<Response>(
        `${environment.apiURl}/character?page=${request.page}&name=${request.name}&status=${request.status}&species=${request.species}&type=${request.type}&gender=${request.gender}`
      );
    }
  }
}
