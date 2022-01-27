import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { PlaceService } from "src/app/services/place.service";
import { Geolocation } from '@capacitor/geolocation';
import { environment } from "src/environments/environment";
import { Place, PlaceToAdd, Location } from "src/app/models/place";

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.page.html',
  styleUrls: ['./new-place.page.scss'],
})
export class NewPlacePage implements OnInit {
  name: string;
  description: string;
  picture: string;
  latitude: number;
  longitude: number;
  coordinates: number[];
  tripId: string = "a83d3e12-ec07-4961-a00f-a5f42f89b041";
  tripHref: string = "/api/trips/a83d3e12-ec07-4961-a00f-a5f42f89b041";
  pictureUrl: string = "testUrl1234567890";

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,
    private placeService: PlaceService,
    
  ) { }

  ngOnInit() {
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
    
    console.log(this.latitude, this.longitude);
  };


   


  addPlace():void {
    console.log("im in")
    let placeToAdd:PlaceToAdd = {
      "name": this.name,
      "description": this.description,
      "location": {
        "type": "Point",
        "coordinates": [this.latitude, this.longitude]
      },
      "tripId": this.tripId,
      "tripHref": this.tripHref,
      "pictureUrl": this.pictureUrl
    }
    console.log("test place", placeToAdd);
    this.placeService.addPlace(placeToAdd).subscribe(place => {
      console.log("second test place", place);
      this.router.navigate(['/trip-list']);
      this.name=this.description="";
    }, err => {
      console.warn("Impossible to add", err);
    });
  }
}
