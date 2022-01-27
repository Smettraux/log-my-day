import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import * as L from 'leaflet';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.page.html',
  styleUrls: ['./places-map.page.scss'],
})
export class PlacesMapPage implements OnInit {

  mapOptions: L.MapOptions;
  constructor(
     // Inject the authentication provider.
     private auth: AuthService,
     // Inject the router
     private router: Router

  ) {  }

  ngOnInit() {

    this.mapOptions = {
      layers: [
        L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18
          }
        )
      ],
      zoom: 13,
      center: L.latLng(46.778186, 6.641524)
    };
  }


  // Add a method to log out.
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

  onMapReady(map: L.Map) {
    setTimeout(() => {
       map.invalidateSize();}
    , 550);


    console.log("map is ready");


  }



}
