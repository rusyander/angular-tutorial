import { Component, inject, input, OnInit, output } from '@angular/core';

import { Place } from './place.model';
import { PlacesService } from './places.service';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css',
})
export class PlacesComponent {
  private placesService = inject(PlacesService);

  places = input.required<Place[]>();
  // selectPlace = output<Place>();

  onSelectPlace(place: Place) {
    // this.selectPlace.emit(place);
    this.placesService.addPlaceToUserPlaces(place);
  }
}
