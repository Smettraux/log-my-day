import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { TripService } from "src/app/services/trip.service";
import { environment } from "src/environments/environment";
import { Trip, TripToAdd } from "src/app/models/trip";

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.page.html',
  styleUrls: ['./create-trip.page.scss'],
})
export class CreateTripPage implements OnInit {
  title: string;
  description: string;

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,
    private tripService: TripService
  ) {
  }

  ngOnInit() {}

  // Add a method to log out.
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

  addTrip():void {
    let tripToAdd:TripToAdd = {
      "title": this.title,
      "description": this.description
    }
    this.tripService.addTrip(tripToAdd).subscribe(trip => {
      console.log(trip);
    }, err => {
      console.warn("Impossible d'ajouter un voyage", err);
    });
  }
  
}