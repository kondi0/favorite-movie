import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './components/add-user/add-user.component';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { reducer, userFeatureKey } from './store/reducer/user.reducer';
import { SharedModule } from '@favorite-movie/shared';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { MatCardModule } from '@angular/material/card';

const userRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'enter',
        pathMatch: 'full',
      },
      { path: 'enter', component: AddUserComponent },
      { path: 'thankyou', component: ThankYouComponent },
    ],
  },
];

@NgModule({
  declarations: [AddUserComponent, ThankYouComponent],
  imports: [
    RouterModule.forChild(userRoutes),
    CommonModule,
    StoreModule.forFeature(userFeatureKey, reducer),
    SharedModule,
    MatCardModule,
  ],
})
export class UserModule {}
