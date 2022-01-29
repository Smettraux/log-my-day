# Log My Day
A travel diary mobile app made with Ionic and Angular.
- [Context](#context)
- [Content](#content)
  - [HTTP API backend](#backend)
  - [Mobile application frontend](#frontend)
- [Local Setup](#setup)

## Context
Log My Day is mobile webapp made in the DevMobile course at HEIG-VD.
## Content
The app allows to :
- Create a trip
- Create multiple places with picture and coordinates (from the device)
- Show places in an interactive map for each trip
- List and search trips
### HTTP API backend <a name="backend">
The app backend is based on the [travel-log API](https://comem-travel-log-api.herokuapp.com/) and made with [Node.js](https://nodejs.org/en/) et [Express](https://expressjs.com/fr/).
### Mobile application frontend <a name="frontend">
The app frontend is made with [Angular](https://angular.io/) and [Ionic](https://ionicframework.com/) frameworks, to combine web and native mobile functionnalities. The result can be used as a web app as well as a native mobile application.
## Local Setup <a name="setup">
1. [Prerequisite](#prerequisite)
2. [Clone the repo](#clone)
3. [Install dependencies](#depedencies)
4. [Create environnement file](#env)
5. [Start the server](#start)
  
### Prerequisite
First, install [Node.js](https://nodejs.org/en/download/)
  
Then Angular
```
  npm install -g @angular/cli
  ```

And finally Ionic
```
  npm install -g @ionic/cli
  ```
  
### Clone the repo <a name="clone">
```
  git clone https://github.com/Smettraux/travel-log.git
  ```
  
### Install dependencies <a name="depedencies">
```
  npm install
```
  
### Create environnement file <a name="env">
In the project, go to your `src/environments/` directory.

Create `environment.ts` and paste the `environment.sample.ts` content inside (with your own urls).


### Start the server <a name="start">
```
  ionic serve
  ```

  
