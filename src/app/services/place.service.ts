import { Injectable } from '@angular/core';
import { Place, PlaceResponse, PlaceToAdd } from '../models/place';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { catchError, map } from 'rxjs/operators';
import { RequestError } from '../models/request-error';

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
    .pipe(map(this.convertPlaceResponseToPlace),catchError(this.handleError));
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
    ),
    catchError(this.handleError));
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

  private handleError(err: HttpErrorResponse) {
    let error:RequestError; 
    if (err.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      error = {
        type: "NETWORK",
        message: "Servers unreachable. Please verify your connection and try again !"
      }
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      error = {
        type: "UNAUTHORIZED",
        message: err.error
      }
    }
    // Return an observable with a user-facing error message.
    return throwError(error);
  }
}
