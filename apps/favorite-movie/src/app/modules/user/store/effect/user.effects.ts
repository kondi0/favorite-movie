import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OmdApiService, User } from '@favorite-movie/shared';
import { addUser, updateUserInTheStore } from '../action/user.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OmdapiMovieInterface } from 'libs/shared/src/lib/models/omdapi/omdapi-movie-interface';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  fillMovieData = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      switchMap(({ user }) =>
        this.hasImdbID(user)
          ? this.fillMovieDetails(user)
          : of(updateUserInTheStore({ ...user }))
      )
    )
  );

  constructor(private actions$: Actions, private omdService: OmdApiService) {}

  private hasImdbID({ favoriteMovie }: User): boolean {
    return (favoriteMovie && !!favoriteMovie.imdbID) || false;
  }

  private fillMovieDetails(user): Actions {
    return this.omdService.getMovieById(user.favoriteMovie.imdbID).pipe(
      map(({ imdbID, Actors, Title }: OmdapiMovieInterface) =>
        updateUserInTheStore({
          ...user,
          favoriteMovie: {
            imdbID,
            Title,
            Actors: this.getActors(Actors),
          },
        })
      ),
      catchError(() => of(updateUserInTheStore({ ...user })))
    );
  }

  private getActors(Actors: string): string {
    return Actors && this.orderActorsByFirstName(Actors);
  }

  private orderActorsByFirstName(Actors: string): string {
    return Actors.split(',')
      .map((item: string) => item.trim())
      .sort((first: string, second: string) =>
        this.getActorsName(first).localeCompare(this.getActorsName(second))
      )
      .join();
  }

  private getActorsName(actor: string): string {
    return actor.split(' ')[0];
  }
}
