import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { TripService } from "src/app/services/trip.service";
import { environment } from "src/environments/environment";
import { Trip, TripToAdd } from "src/app/models/trip";
import { alertController } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.page.html',
  styleUrls: ['./create-trip.page.scss'],
})
export class CreateTripPage implements OnInit {
  title: string;
  description: string;
  tripError: boolean = false;

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,
    private tripService: TripService,
    public alertController: AlertController
  ) {
  }

  ngOnInit() {}

  // Add a method to log out.
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

  addTrip(addTripForm: NgForm) {

    if (addTripForm.invalid) {
      return;
    }
    // Hide any previous registering error.
    this.tripError = false;
    let tripToAdd:TripToAdd = {
      "title": this.title,
      "description": this.description
    }
    this.tripService.addTrip(tripToAdd).subscribe(trip => {
      this.router.navigate(['/trip-list'], { state: { show: "true" } });
      this.title=this.description="";
    }, err => {
      if(err.type === "UNAUTHORIZED") {
        this.tripError = true;
      } else {
        this.showNetworkPopUpAlert();
      }
    });
  }

  showNetworkPopUpAlert(): void {
    this.alertController.create({
      header: 'Network issue',
      message: 'The request cannot be made to the server. Please check your connection and try again.',
      buttons: ['OK'],
    }).then(res => {
      res.present();
    });
  }
  
}