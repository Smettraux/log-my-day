export type Place = {
    id: string;
    href: string;
    name: string;
    description: string;
    location: Location;
    pictureUrl: string;
    createdAt: Date;
  };

  export type PlaceResponse = {
    "id": string;
    "href": string;
    "name": string;
    "description": string;
    "location": Location;
    "tripId": string;
    "tripHref": string;
    "pictureUrl": string;
    "createdAt": Date;
    "updatedAt": Date;
  };

  export type PlaceToAdd = {
    "name": string;
    "description": string;
    "location": Location;
    "tripId": string;
    "tripHref": string;
    "pictureUrl": string;
  }

  export type Location = {
      "type": string;
      "coordinates": number[];
  }