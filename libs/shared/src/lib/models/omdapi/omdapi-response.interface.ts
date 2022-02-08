import { OmdapiMovieInterface } from './omdapi-movie-interface';

export interface OmdapiResponseInterface {
  Response: boolean;
  Search: OmdapiMovieInterface[];
  totalResults: number;
}
