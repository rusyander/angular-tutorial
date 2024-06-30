import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

export const api = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();
  loading = signal<boolean>(true);

  loadAvailablePlaces() {
    return this.httpClient.get<{ places: Place[] }>(`${api}/places`, {
      observe: 'response',
    });
  }

  loadUserPlaces() {
    this.httpClient
      .get<{ places: Place[] }>(`${api}/user-places`, {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          return response.body;
        }),
        catchError((error) => {
          console.error(error);
          this.errorService.showError(
            'An error occurred while loading user places'
          );
          return throwError(
            () => new Error('An error occurred while loading user places')
          );
        })
      )
      .subscribe({
        next: (response) => {
          this.userPlaces.set(response?.places!);
        },
        complete: () => {
          this.loading.set(false);
          this.errorService.clearError();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  addPlaceToUserPlaces(place: Place) {
    this.httpClient
      .put<Place[]>(
        `${api}/user-places`,
        {
          placeId: place.id,
        },
        {
          observe: 'response',
        }
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          this.errorService.showError(
            'An error occurred while loading user places'
          );
          return throwError(
            () => new Error('An error occurred while loading user places')
          );
        })
      )
      .subscribe({
        complete: () => {
          console.log('Place added');
          this.loadUserPlaces();
          this.errorService.clearError();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  removeUserPlace(place: Place) {
    this.httpClient
      .delete<Place[]>(`${api}/user-places/${place.id}`, {
        observe: 'response',
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          this.errorService.showError(
            'An error occurred while loading user places'
          );
          return throwError(
            () => new Error('An error occurred while loading user places')
          );
        })
      )
      .subscribe({
        complete: () => {
          console.log('Place removed');
          this.loadUserPlaces();
          this.errorService.clearError();
          console.log(this.loadedUserPlaces);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
