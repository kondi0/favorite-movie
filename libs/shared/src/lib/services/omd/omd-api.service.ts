import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OmdapiResponseInterface } from 'libs/shared/src/lib/models/omdapi/omdapi-response.interface';
import { OmdapiMovieInterface } from '../../models/omdapi/omdapi-movie-interface';

@Injectable({
  providedIn: 'root',
})
export class OmdApiService {
  constructor(
    private httpClient: HttpClient,
    @Inject('omdapiUrl') private omdapiUrl: string,
    @Inject('omdapiUrl_apikey') private omdapiUrlApikey: string
  ) {}

  searchMoviesByTerm(term: string): Observable<OmdapiResponseInterface> {
    return this.httpClient.get<OmdapiResponseInterface>(
      `${this.getUrl()}s=${term}`
    );
  }

  getMovieById(id: string): Observable<OmdapiMovieInterface> {
    return this.httpClient.get<OmdapiMovieInterface>(`${this.getUrl()}i=${id}`);
  }

  private getUrl() {
    return `${this.omdapiUrl}?apikey=${this.omdapiUrlApikey}&type=movie&`;
  }
}
