import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class MoviesFilterComponent implements OnInit, ControlValueAccessor {
  selectedMovie = '';

  onChange = (movie: unknown) => {
    debugger;
  };

  onTouched = () => {};

  constructor() {}

  ngOnInit(): void {}

  writeValue(movie: string) {
    this.selectedMovie = movie;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  hey(event: unknown) {
    this.onChange(event);
  }
}
