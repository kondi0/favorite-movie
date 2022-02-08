import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesFilterComponent } from './movies-filter.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'apps/favorite-movie/src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';

describe('MoviesFilterComponent', () => {
  let component: MoviesFilterComponent;
  let fixture: ComponentFixture<MoviesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesFilterComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatSelectModule,
        MatAutocompleteModule,
        FormsModule,
        MatButtonModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: 'omdapiUrl',
          useValue: environment.omdapi,
        },
        {
          provide: 'omdapiUrl_apikey',
          useValue: environment.omdapi_apikey,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
