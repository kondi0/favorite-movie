import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OmdApiService } from 'libs/shared/src/lib/services/omd/omd-api.service';
import { map } from 'rxjs/operators';
import { OmdapiMovieInterface } from 'libs/shared/src/lib/models/omdapi/omdapi-movie-interface';
import { Observable, of } from 'rxjs';
import { OmdapiResponseInterface } from 'libs/shared/src/lib/models/omdapi/omdapi-response.interface';

@Component({
  selector: 'movies-filter',
  templateUrl: './movies-filter.component.html',
  styleUrls: ['./movies-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MoviesFilterComponent,
    },
  ],
})
export class MoviesFilterComponent implements ControlValueAccessor {
  selectedMovie = '';
  suggestions: Observable<OmdapiMovieInterface[]> = of([]);

  onChange = (movie: string) => {};

  onTouched = () => {};

  constructor(private apiService: OmdApiService) {}

  writeValue(movie: string): void {
    this.selectedMovie = movie;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  search(term: string): void {
    this.onChange(term);
    this.suggestions = this.apiService
      .getMovies(term)
      .pipe(map(({ Search }: OmdapiResponseInterface) => Search));
  }
}
