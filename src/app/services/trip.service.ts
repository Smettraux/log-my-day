import { Injectable } from '@angular/core';
import { Trip, TripResponse, TripToAdd } from '../models/trip';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { catchError, map } from 'rxjs/operators';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

  getTrips(): Observable<Trip[]> {
    const url = `${API_URL}/trips`;
    return this.http
    .get<TripResponse[]>(url)
    .pipe(map(this.convertTripResponseToTrip));
  }

  addTrip(trip: TripToAdd): Observable<Trip> {
    return this.http.post<Trip>(`${API_URL}/trips`, trip);
  }

  convertTripResponseToTrip(response: TripResponse[]): Trip[] {
    let trips:Trip[] = [];
    response.forEach((trip: Trip) => {
      trips.push(
        {
          title: trip.title,
          description: trip.description,
          createdAt: trip.createdAt,
        }
      );
    })
    return trips;
  }
}

