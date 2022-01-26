export type Trip = {
    title: string;
    description: string;
    createdAt: Date;
  };

export type TripResponse = {
  "id": string,
  "href": string,
  "title": string,
  "description": string,
  "placesCount": number,
  "userId": string,
  "userHref": string,
  "createdAt": Date,
  "updatedAt": Date
};

export type TripToAdd = {
  "title": string,
  "description": string
};