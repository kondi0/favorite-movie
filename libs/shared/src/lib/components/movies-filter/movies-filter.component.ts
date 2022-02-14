import { Component, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { OmdApiService } from 'libs/shared/src/lib/services/omd/omd-api.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
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
export class MoviesFilterComponent implements ControlValueAccessor, OnInit {
  private readonly _dueTime = 100;
  movieAutocomplete: FormControl = new FormControl();
  suggestions: Observable<OmdapiMovieInterface[]> = of([]);

  constructor(private apiService: OmdApiService) {}

  ngOnInit(): void {
    this.suggestions = this.movieAutocomplete.valueChanges.pipe(
      debounceTime(this._dueTime),
      distinctUntilChanged(),
      switchMap((term: string) =>
        this.apiService
          .searchMoviesByTerm(term)
          .pipe(map(({ Search }: OmdapiResponseInterface) => Search))
      )
    );
  }

  onChange = (movie: string) => {};

  onTouched = () => {};

  writeValue(movie: string): void {
    this.searchForSelectedMovie(movie);
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  displayTitle(movie: OmdapiMovieInterface) {
    return (movie && movie.Title) || '';
  }

  select(movie: OmdapiMovieInterface) {
    this.onChange(movie.imdbID);
  }

  private searchForSelectedMovie(movie: string) {
    if (movie) {
      this.apiService
        .getMovieById(movie)
        .subscribe((selectedMovie: OmdapiMovieInterface) => {
          this.movieAutocomplete.setValue(selectedMovie);
        });
    }
  }
}
