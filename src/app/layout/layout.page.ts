import { Component, OnInit } from '@angular/core';

// Custom type that represent a tab data.
declare type PageTab = {
  title: string; // The title of the tab in the tab bar
  icon: string; // The icon of the tab in the tab bar
  path: string; // The route's path of the tab to display
};

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {
  tabs: PageTab[];

  constructor() {
    this.tabs = [
      { title: "New Trip", icon: "add", path: "create-trip" },
      { title: "Places Map", icon: "map", path: "places-map" },
      { title: "Trip List", icon: "list", path: "trip-list" },
    ];
  }

  ngOnInit() {
  }

}
