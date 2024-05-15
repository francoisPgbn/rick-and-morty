import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Info } from '../../models/info.model';
import { ResponseWithError } from '../../class/responseWithError';
import { Location } from '../../models/location/location.model';

export namespace GetLocationsService {
  export interface Request {
    page: number;
    name: string;
    type: string;
    dimension: string;
  }

  export interface Response extends ResponseWithError {
    info: Info;
    results: Location[];
  }

  @Injectable({
    providedIn: 'root',
  })
  export class Endpoint {
    constructor(private http: HttpClient) {}

    send(request: Request): Observable<Response> {
      return this.http.get<Response>(`${environment.apiURl}/location?page=${request.page}&name=${request.name}&dimension=${request.dimension}&type=${request.type}`);
    }
  }
}
