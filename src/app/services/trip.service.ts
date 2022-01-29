import { Injectable } from '@angular/core';
import { Trip, TripResponse, TripToAdd } from '../models/trip';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { catchError, map } from 'rxjs/operators';
import { RequestError } from '../models/request-error';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

  getTrips(userId:string,search: string = "", page: number = 1): Observable<Trip[]> {
    
    const url = search == "" ? `${API_URL}/trips?user=${userId}&pageSize=10&page=${page}&sort=-createdAt&order=asc` : `${API_URL}/trips?user=${userId}&pageSize=10&page=${page}&search=${search}&sort=-createdAt&order=asc`;
    return this.http
    .get<TripResponse[]>(url)
    .pipe(map(this.convertTripResponseToTrip),
      catchError(this.handleError)
    );
  }

  getTrip(id: string): Observable<Trip> {
    const url = `${API_URL}/trips?id=${id}`;
    return this.http
    .get<TripResponse>(url)
    .pipe(map((trip) => {
      let tripToReturn: Trip = {
        id: trip[0].id,
        title: trip[0].title,
        description: trip[0].description,
        createdAt: trip[0].createdAt,
      }
      return tripToReturn;
    }
      
    ),
    catchError(this.handleError));
    
  } 

  editTrip(id: string, trip: TripToAdd): Observable<Trip> {
    return this.http.patch<Trip>(`${API_URL}/trips/${id}`, trip).pipe(
      catchError(this.handleError)
    );
  }

  deleteTrip(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/trips/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addTrip(trip: TripToAdd): Observable<Trip> {
    return this.http.post<Trip>(`${API_URL}/trips`, trip).pipe(
      catchError(this.handleError)
    );
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

