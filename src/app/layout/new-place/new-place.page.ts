import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { PlaceService } from "src/app/services/place.service";
import { Geolocation } from '@capacitor/geolocation';
import { environment } from "src/environments/environment";
import { Place, PlaceToAdd, Location } from "src/app/models/place";
import { PictureService } from 'src/app/picture/picture.service';
import { QimgImage } from 'src/app/models/q-img-image';
import { AlertController, ViewDidEnter } from '@ionic/angular';
import { alertController } from '@ionic/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.page.html',
  styleUrls: ['./new-place.page.scss'],
})
export class NewPlacePage implements OnInit, ViewDidEnter {
  name: string;
  description: string;
  picture: QimgImage;
  latitude: number;
  longitude: number;
  coordinates: number[];
  tripId: string = "";
  placeError: boolean = false;
  // tripHref: string = "";
  pictureUrl: string;

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,
    private placeService: PlaceService,
    private route: ActivatedRoute,

    private pictureService: PictureService,
    public alertController: AlertController

  ) {}

  ngOnInit() {
    this.printCurrentPosition();

  }

  ionViewDidEnter() {
    this.placeError = false;
    this.name = "";
    this.description = "";
    const query = this.route.snapshot.queryParamMap.get('tripId');
    this.tripId = query;
    return query;
  }

  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picture = picture;
      this.pictureUrl = this.picture.url;
    });
  }

  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;
  };


  backToPlacesMap() {
    this.router.navigate(['/places-map'],{queryParams: {id: this.ionViewDidEnter()}} );
  }


  addPlace(addPlaceForm: NgForm) {
    if (addPlaceForm.invalid) {
      return;
    }

    // Hide any previous registering error.
    this.placeError = false;
    let placeToAdd:PlaceToAdd = {
      "name": this.name,
      "description": this.description,
      "location": {
        "type": "Point",
        "coordinates": [this.latitude, this.longitude]
      },
      "tripId": this.tripId,
      "pictureUrl": this.pictureUrl
    }
    this.placeService.addPlace(placeToAdd).subscribe(place => {
      this.router.navigate(['/trip-list']);
      this.name=this.description="";
      this.picture=undefined;
    }, err => {
      console.warn("Impossible to add", err);
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
