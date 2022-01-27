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

  addPlace(place: PlaceToAdd): Observable<Place> {
    return this.http.post<Place>(`${API_URL}/places`, place);
  }
}
