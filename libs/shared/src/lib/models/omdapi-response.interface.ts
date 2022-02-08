import { OmdapiMovieInterface } from 'libs/shared/src/lib/models/omdapi-movie-interface';

export interface OmdapiResponseInterface {
  Response: boolean;
  Search: OmdapiMovieInterface[];
  totalResults: number;
}
