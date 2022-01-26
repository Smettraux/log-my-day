import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPage } from './layout.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        // Route that loads the CreateTrip module
        path: "create-trip",
        loadChildren: () =>
          import("./create-trip/create-trip.module").then(
            (m) => m.CreateTripPageModule
          ),
      },
      {
        // Route that loads the PlacesMap module
        path: "places-map",
        loadChildren: () =>
          import("./places-map/places-map.module").then(
            (m) => m.PlacesMapPageModule
          ),
      },
      {
        // Route that loads the TripList module
        path: "trip-list",
        loadChildren: () =>
          import("./trip-list/trip-list.module").then(
            (m) => m.TripListPageModule
          ),
      },
      {
        // Route that loads the EditList module
        path: "edit-trip",
        loadChildren: () =>
          import("./edit-trip/edit-trip.module").then(
            (m) => m.EditTripPageModule
          ),
      },
      {
        path: "",
        redirectTo: "trip-list", // Or whatever tabs is your default one
        pathMatch: "full",
      },
    ],
  },
  {
    path: 'edit-trip',
    loadChildren: () => import('./edit-trip/edit-trip.module').then( m => m.EditTripPageModule)
  },
  {
    path: 'new-place',
    loadChildren: () => import('./new-place/new-place.module').then( m => m.NewPlacePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule {}
