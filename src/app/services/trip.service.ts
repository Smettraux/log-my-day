import { Injectable } from '@angular/core';
import { Trip, TripResponse } from '../models/trip';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

  getTrips(): Observable<Trip[]> {
    const url = `${environment.apiUrl}/trips`;
    return this.http
    .get<TripResponse[]>(url)
    .pipe(map(this.convertTripResponseToTrip));
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

