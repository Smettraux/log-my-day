import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ViewDidEnter } from "@ionic/angular";
import { AuthService } from "src/app/auth/auth.service";
import { TripService } from "src/app/services/trip.service";
import { environment } from "src/environments/environment";
import { Trip } from "src/app/models/trip";

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.page.html',
  styleUrls: ['./trip-list.page.scss'],
})
export class TripListPage implements ViewDidEnter  {

  trips: Trip[] = [];

  constructor(
    // Inject the AuthService
    private auth: AuthService,
    // Inject the HTTP client
    public http: HttpClient,
    private tripService: TripService
  ) {}

  ionViewDidEnter(): void {
    this.tripService.getTrips().subscribe(trips => {
      this.trips = trips;
      console.log("Trips:" + this.trips);
    }, err => {
      console.warn('Could not get new joke', err);
    });
    // Make an HTTP request to retrieve the trips.
    /*const url = `${environment.apiUrl}/trips`;
    this.http.get(url).subscribe((trips) => {
      console.log(`Trips loaded`, trips);
    });*/
  }

}
