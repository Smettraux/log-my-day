import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';"@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import * as L from 'leaflet';
import { marker } from 'leaflet';
import { map } from 'rxjs/operators';
import { defaultIcon } from './default-marker';
import { Place } from 'src/app/models/place';
import { PlaceService } from 'src/app/services/place.service';
import { HttpClient } from '@angular/common/http';
import { ViewDidEnter } from '@ionic/angular';
import { TripService } from 'src/app/services/trip.service';




@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.page.html',
  styleUrls: ['./places-map.page.scss'],
})
export class PlacesMapPage implements OnInit, ViewDidEnter {

  mapOptions: L.MapOptions;
  mapMarkers: L.Marker[];
  places: Place[] = [];
  tripTitle : string ;


  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,
    public http: HttpClient,
    private tripService: TripService,
    private placeService: PlaceService,
    private route: ActivatedRoute,


  ) { this.mapMarkers = [];}

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
      zoom: 5,
      center: L.latLng(46.778186, 6.641524)
    };

  }



  ionViewDidEnter(): void {
    this.getPlaces();
    this.setupMarkers();
    document.getElementById("placeName").textContent = "Select a place";
    document.getElementById('imageWrapper').style.display = 'none';
    document.getElementById('editPlaceWrapper').style.display = 'none';
    document.getElementById('locationLabel').textContent = "";
    document.getElementById('decriptionLabel').textContent = "";
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
    , 0);
  }

  getPlaces(): void {
    const tripId = this.route.snapshot.queryParamMap.get('id');
    this.tripService.getTrip(tripId).subscribe(trip => {
      this.tripTitle = trip.title;
      document.getElementById("title").textContent = this.tripTitle;
    });


    this.places = [];

    this.placeService.getPlaces(tripId).subscribe(places => {
      this.places = places;
      this.places.forEach(place => {

        let latitude = place.location.coordinates[0];
        let longitude = place.location.coordinates[1];

        this.mapMarkers.push(
          marker([latitude, longitude], { icon: defaultIcon }).on('click', () => {
            //popup with marker name
            console.log(place.name);

           document.getElementById("placeName").textContent = place.name;
           document.getElementById('imageWrapper').style.display = 'inline-block';
           document.getElementById('locationLabel').textContent = place.location.coordinates[0].toString() + ", " + place.location.coordinates[1].toString();
           document.getElementById('decriptionLabel').textContent = place.description;
           place.pictureUrl ? document.getElementById('placeImage').setAttribute('src', place.pictureUrl) : document.getElementById('imageWrapper').setAttribute('style', 'display: none')

          })
        );
      });

    }, err => {
      console.warn('Could not get places', err);
    });
  }

  setupMarkers() : void {

    this.mapMarkers = [] ;
    this.places.forEach(place => {

      let latitude = place.location.coordinates[0];
      let longitude = place.location.coordinates[1];

      this.mapMarkers.push(
        marker([latitude, longitude], { icon: defaultIcon }).on('click', () => {
          //popup with marker name
          // console.log(place.name);

          // //add a method to fill the dom element with place name
          // document.getElementById("placeName").innerHTML = place.name;
          // console.log("does it even work ?")
        })
      );
    });
  }

  newPlace(){
    const tripId = this.route.snapshot.queryParamMap.get('id');
    this.router.navigate(['/new-place'],{queryParams: {tripId: tripId}} );
  }

  editPlace(){
    console.log("you cannot edit a place in this version :(");
    document.getElementById("editPlaceWrapper").style.display = 'none';
  }

}
