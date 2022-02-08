import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OmdapiResponseInterface } from 'libs/shared/src/lib/models/omdapi/omdapi-response.interface';

@Injectable({
  providedIn: 'root',
})
export class OmdApiService {
  constructor(
    private httpClient: HttpClient,
    @Inject('omdapiUrl') private omdapiUrl: string,
    @Inject('omdapiUrl_apikey') private omdapiUrlApikey: string
  ) {}

  getMovies(term: string): Observable<OmdapiResponseInterface> {
    return this.httpClient.get<OmdapiResponseInterface>(
      `${this.omdapiUrl}?apikey=${this.omdapiUrlApikey}&type=movie&s=${term}`
    );
  }
}
