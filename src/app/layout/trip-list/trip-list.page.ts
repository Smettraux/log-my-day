import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ViewDidEnter, AlertController, IonItemSliding } from "@ionic/angular";
import { AuthService } from "src/app/auth/auth.service";
import { TripService } from "src/app/services/trip.service";
import { Trip } from "src/app/models/trip";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.page.html',
  styleUrls: ['./trip-list.page.scss'],
})
export class TripListPage implements ViewDidEnter  {

  trips: Trip[] = [];
  currentPage: number = 1;
  searchingText: string;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    // Inject the AuthService
    private auth: AuthService,
    // Inject the HTTP client
    public http: HttpClient,
    private tripService: TripService,
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController
  ) {
    // Toast if a trip has been created
    const { show } = window.history.state;
    if (show == "true") {
      this.presentToast();
    } 
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your trip has been added successfully',
      duration: 3000
    });
    toast.present();
  }

  ionViewDidEnter(): void {
    this.getTrips();
  }

  getTrips(): void {
    this.tripService.getTrips(this.searchingText).subscribe(trips => {
      this.trips = trips;
    }, err => {
      console.warn('Could not get trips', err);
    });
  }

  loadTrips(event) {
    this.tripService.getTrips(this.searchingText,this.currentPage++).subscribe(trips => {
      if(trips.length > 0){
        this.trips = this.trips.concat(trips);
        event.target.complete();
      } else {
        this.infiniteScroll.disabled = true;
        event.target.complete();
      }
    }, err => {
      console.warn('Could not get trips', err);
    });
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  search(){
    this.getTrips();
  }

  // Add a method to log out.
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

  addTripPage() {
    console.log("Add a trip")
  }

  showDeleteAlert(slidingItem: IonItemSliding,tripName: string, tripId: string) {
    this.alertController.create({
      header: 'Delete "' + tripName + '" ?',
      message: 'The trip will not be available anymore.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            slidingItem.closeOpened();
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.tripService.deleteTrip(tripId).subscribe(() => {
              this.trips = this.trips.filter(trip => trip.id !== tripId);
            }, err => {
              console.warn('Delete trip', err);
            });
            slidingItem.closeOpened();
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
}
