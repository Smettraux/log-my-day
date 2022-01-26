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

  getTrips(search: string = ""): Observable<Trip[]> {
    
    const url = search == "" ? `${API_URL}/trips` : `${API_URL}/trips?search=${search}&sort=createdAt&order=desc`;
    return this.http
    .get<TripResponse[]>(url)
    .pipe(map(this.convertTripResponseToTrip));
  }

  deleteTrip(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/trips/${id}`);
  }

  addTrip(trip: TripToAdd): Observable<Trip> {
    return this.http.post<Trip>(`${API_URL}/trips?sort=createdAt&order=desc`, trip);
  }

  convertTripResponseToTrip(response: TripResponse[]): Trip[] {
    let trips:Trip[] = [];
    response.forEach((trip: Trip) => {
      trips.push(
        {
          id: trip.id,
          title: trip.title,
          description: trip.description,
          createdAt: trip.createdAt,
        }
      );
    })
    return trips;
  }
}

