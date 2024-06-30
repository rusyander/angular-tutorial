import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { api, PlacesService } from '../places.service';
import { map, catchError, throwError } from 'rxjs';
import { ErrorService } from '../../shared/error.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  private placesService = inject(PlacesService);
  private errorService = inject(ErrorService);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  places = signal<Place[] | undefined>(undefined);

  loading = signal<boolean>(true);
  error = signal<string | undefined>(undefined);

  ngOnInit() {
    const getPlacesSub = this.placesService
      .loadAvailablePlaces()
      .pipe(
        map((response) => {
          return response.body;
        }),
        catchError((error) => {
          console.error(error);
          this.errorService.showError('An error occurred while loading places');
          return throwError(
            () => new Error('An error occurred while loading user places')
          );
        })
      )
      .subscribe({
        next: (response) => {
          this.loading.set(true);
          this.places.set(response?.places);
        },
        complete: () => {
          this.loading.set(false);
          this.errorService.clearError();
        },
        error: (error) => {
          console.error(error);
          this.error.set(error + 'An error occurred while loading places');
        },
      });

    this.destroyRef.onDestroy(() => {
      getPlacesSub.unsubscribe();
    });
  }
}
