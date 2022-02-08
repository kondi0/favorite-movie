import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './components/add-user/add-user.component';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { reducer, userFeatureKey } from './store/reducer/user.reducer';
import { SharedModule } from '@favorite-movie/shared';
import { ThankYouComponent } from './components/thank-you/thank-you.component';

const userRoutes: Routes = [
  { path: '', redirectTo: 'enter' },
  { path: 'enter', component: AddUserComponent },
  { path: 'thankyou', component: ThankYouComponent },
];

@NgModule({
  declarations: [AddUserComponent, ThankYouComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(userFeatureKey, reducer),
    RouterModule.forChild(userRoutes),
    SharedModule,
  ],
})
export class UserModule {}
