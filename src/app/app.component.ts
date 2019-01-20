import {Component, OnInit, ViewChild} from '@angular/core';
//import { } from '@types/googlemaps';
import { Config, ConfigService } from './config/config.service';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Model} from './config/model';
// import { HttpModule } from '@angular/http';
// import {Observable} from 'rxjs/Observable';
// import {catchError} from 'rxjs/operators';
// import {CustExtBrowserXhr} from './config/cust-ext-browser-xhr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // @ViewChild('gmap') gmapElement: any;
  // map: google.maps.Map;

  isTracking = false;

  currentLat: any;
  currentLong: any;
  config: Config;
  http: HttpClient;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
    })};
//  marker: google.maps.Marker;

  constructor(http: HttpClient) {this.http = http;
  }

  ngOnInit() {

    console.log("fdsdsdsdsds");
    /*   var mapProp = {
         center: new google.maps.LatLng(18.5793, 73.8143),
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       };*/
    // this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    /*   const model = new Model();
       model.address = 'jkmk';
       model.latitude = '1222';
       model.longitude = '133443';
       console.log(model);*/

    this.findMe();
  }

  findMe() {
    if (navigator.geolocation) {
      console.log(this.currentLat);

      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;

        /*let location1 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        */console.log(this.currentLat);
        const model = new Model();
        model.address = 'jkmk';
        model.latitude = this.currentLat;
        model.longitude = this.currentLong;
        console.log(model);
        this.http.post('http://localhost:3000/addLinkUser/', model, this.httpOptions).subscribe(data => {
          console.log(data);
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }

  }

  /* showPosition(position) {
     this.currentLat = position.coords.latitude;
     this.currentLong = position.coords.longitude;

     let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
     this.map.panTo(location);

     if (!this.marker) {
       this.marker = new google.maps.Marker({
         position: location,
         map: this.map,
         title: 'Got you!'
       });
     }
     else {
       this.marker.setPosition(location);
     }
   }
 */
  /*  trackMe() {
      if (navigator.geolocation) {
        this.isTracking = true;
        navigator.geolocation.watchPosition((position) => {
          this.showTrackingPosition(position);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }

    showTrackingPosition(position) {
      console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
      this.currentLat = position.coords.latitude;
      this.currentLong = position.coords.longitude;

    /!*  let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map.panTo(location);

      if (!this.marker) {
        this.marker = new google.maps.Marker({
          position: location,
          map: this.map,
          title: 'Got you!'
        });
      }
      else {
        this.marker.setPosition(location);
      }*!/
    }*/
  /* showConfig() {

     this.configService.getConfig()
       .subscribe((data: Config) => this.config = {
         baseUrl: data['baseUrl'],
       });
   }*/

  /*addHero (hero: Model) {
     this.http.post<Model>(this.config.baseUrl, hero, this.httpOptions).subscribe(res => console.log(res));
  }*/

}
