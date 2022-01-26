import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ViewDidEnter } from "@ionic/angular";
import { AuthService } from "src/app/auth/auth.service";
import { TripService } from "src/app/services/trip.service";
import { Trip } from "src/app/models/trip";
import { Router } from "@angular/router";


@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.page.html',
  styleUrls: ['./trip-list.page.scss'],
})
export class TripListPage implements ViewDidEnter  {

  trips: Trip[] = [];
  searchingText: string;

  constructor(
    // Inject the AuthService
    private auth: AuthService,
    // Inject the HTTP client
    public http: HttpClient,
    private tripService: TripService,
    private router: Router
  ) {}

  ionViewDidEnter(): void {
    this.getTrips();
  }

  getTrips(search: string = ""): void {
    this.tripService.getTrips(search).subscribe(trips => {
      this.trips = trips;
      console.log("Trips:" + this.trips);
    }, err => {
      console.warn('Could not get trips', err);
    });
  }

  search(){
    this.getTrips(this.searchingText);
  }

  // Add a method to log out.
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }
}
