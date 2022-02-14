import { OmdapiMovieInterface } from 'libs/shared/src/lib/models/omdapi/omdapi-movie-interface';

export interface User {
  name: string;
  username?: string;
  country: string;
  postCode?: string;
  favoriteMovie?: OmdapiMovieInterface;
}
