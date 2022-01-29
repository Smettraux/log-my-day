import { Injectable } from '@angular/core';
import { Place, PlaceResponse, PlaceToAdd } from '../models/place';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { catchError, map } from 'rxjs/operators';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  getPlaces(tripId : string) : Observable<Place[]> {
    const url = `${API_URL}/places?trip=${tripId}`;
    return this.http
    .get<PlaceResponse[]>(url)
    .pipe(map(this.convertPlaceResponseToPlace));
  }

  getPlace(id: string): Observable<Place> {
    const url = `${API_URL}/places?id=${id}`;
    return this.http
    .get<PlaceResponse>(url)
    .pipe(map((place) => {
      let placeToReturn: Place = {
        id: place[0].id,
        href: place[0].href,
        name: place[0].name,
        description: place[0].description,
        location: place[0].location,
        pictureUrl: place[0].pictureUrl,
        createdAt: place[0].createdAt,
      }
      return placeToReturn;
    }
    ));
  }

  addPlace(place: PlaceToAdd): Observable<Place> {
    console.log("addPlace", place);
    return this.http.post<Place>(`${API_URL}/places`, place);
  }

  convertPlaceResponseToPlace(response: PlaceResponse[]): Place[] {
    let places:Place[] = [];
    response.forEach((place: Place) => {
      places.push(
        {
          id: place.id,
          href: place.href,
          name: place.name,
          description: place.description,
          location: place.location,
          pictureUrl: place.pictureUrl,
          createdAt: place.createdAt,
        }
      );
    });
    return places;
  }
}
