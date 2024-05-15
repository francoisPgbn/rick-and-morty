import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ResponseWithError } from '../../class/responseWithError';
import { LocationId } from '../../models/id.model';
import { Location } from '../../models/location/location.model';

export namespace GetLocationService {
  export interface Request {
    id: LocationId;
  }

  export interface Response extends Location, ResponseWithError {}

  @Injectable({
    providedIn: 'root',
  })
  export class Endpoint {
    constructor(private http: HttpClient) {}

    send(request: Request): Observable<Response> {
      return this.http.get<Response>(
        `${environment.apiURl}/location/${request.id}`
      );
    }
  }
}
