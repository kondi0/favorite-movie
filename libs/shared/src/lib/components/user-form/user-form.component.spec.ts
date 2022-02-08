import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from '@favorite-movie/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MoviesFilterComponent } from 'libs/shared/src/lib/components/movies-filter/movies-filter.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'apps/favorite-movie/src/environments/environment';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormComponent, MoviesFilterComponent],
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
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
