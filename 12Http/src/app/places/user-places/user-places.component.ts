import { Component, DestroyRef, inject, OnInit } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  private placesService = inject(PlacesService);

  places = this.placesService.loadedUserPlaces;
  loading = this.placesService.loading;

  ngOnInit() {
    const getUserPlacesSub = this.placesService.loadUserPlaces();
  }

  onSelectPlace(place: Place) {
    this.placesService.removeUserPlace(place);
  }
}
