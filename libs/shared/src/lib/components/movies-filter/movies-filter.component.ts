import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OmdApiService } from '../../services/omd-api.service';
import { map } from 'rxjs/operators';
import { OmdapiMovieInterface } from '../../models/omdapi-movie-interface';
import { Observable, of } from 'rxjs';

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

  writeValue(movie: string) {
    this.selectedMovie = movie;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  search(term: string) {
    this.onChange(term);
    this.suggestions = this.apiService
      .getMovies(term)
      .pipe(map((result) => result.Search));
  }
}
