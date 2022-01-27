import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import * as L from 'leaflet';
import { marker } from 'leaflet';
import { map } from 'rxjs/operators';
import { defaultIcon } from './default-marker';




@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.page.html',
  styleUrls: ['./places-map.page.scss'],
})
export class PlacesMapPage implements OnInit {

  mapOptions: L.MapOptions;
  mapMarkers: L.Marker[];

  constructor(
     // Inject the authentication provider.
     private auth: AuthService,
     // Inject the router
     private router: Router

  ) { this.mapMarkers = [
    marker([ 46.778186, 6.641524 ], { icon: defaultIcon }),
    marker([ 46.780796, 6.647395 ], { icon: defaultIcon }),
    marker([ 46.784992, 6.652267 ], { icon: defaultIcon }).on('click', () => {


    })
  ]; }

  ngOnInit() {

    this.mapOptions = {
      layers: [
        L.tileLayer('https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
	      attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      	minZoom: 0,
      	maxZoom: 22,
	      subdomains: 'abcd',
	      accessToken: 'Qy4o8rKKQH1B0VonlkbHYnzwlBmzfvZUyRaIck3J7IXCGWA6CDElbCNDE2m4uPzh'
          })
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
