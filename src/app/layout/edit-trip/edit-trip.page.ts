import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { TripService } from "src/app/services/trip.service";
import { environment } from "src/environments/environment";
import { Trip, TripToAdd } from "src/app/models/trip";
import { alertController } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.page.html',
  styleUrls: ['./edit-trip.page.scss'],
})
export class EditTripPage implements OnInit {
  title: string;
  description: string;
  tripError: boolean = false;

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,
    private tripService: TripService,
    private route: ActivatedRoute,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    const tripId = this.route.snapshot.paramMap.get('id');
    console.log(tripId);
    const trip = this.tripService.getTrip(tripId).subscribe(trip => {
      this.title=trip.title;
      this.description=trip.description;
    }, err => {
        this.showNetworkPopUpAlert();
    });
    
  }

  // Add a method to log out.
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

  editTrip(editTripForm: NgForm) {
    if (editTripForm.invalid) {
      return;
    }

    // Hide any previous registering error.
    this.tripError = false;
    const tripId = this.route.snapshot.paramMap.get('id');
    let tripToAdd:TripToAdd = {
      "title": this.title,
      "description": this.description
    }
    this.tripService.editTrip(tripId, tripToAdd).subscribe(trip => {
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
