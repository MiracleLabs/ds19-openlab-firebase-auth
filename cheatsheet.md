# DS18 Open Lab | Connecting Your Ionic App to a Public API Service

The markdown file consists of commands and code snippets that will help you complete the lab - Connecting Your Ionic App to a Public API Service.

## Commands

### Install Cordova 

```shell
npm install -g cordova
```
### Install Ionic framework

```shell
npm install -g ionic
```

### Create an Ionic application

```shell
ionic start <application-name> blank
```

### Create a page in Ionic application

```shell
ionic g page <page name>
```
### Create a provider in Ionic application

```shell
ionic g provider <provider name>
```
### Simulate the app in browser

```shell
ionic serve
```
### Simulate the app in browser along with platform

```shell
ionic serve -l
```

## Code Snippets

### app.module.ts

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { WeatherProvider } from '../providers/weather/weather';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [   
    MyApp,
  ],
  imports: [   
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],          
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WeatherProvider
  ]
})
export class AppModule {}
```

### location.html

```html
<ion-header>
  <ion-navbar color="primary">
    <ion-title>location</ion-title>
  </ion-navbar>
</ion-header>
<ion-content padding>
  <ion-grid>
    <ion-row>
      <ion-col width-100>
        <ion-list>
          <form (ngSubmit) = "saveForm()">
            <ion-item>
              <ion-label fixed>
                City
              </ion-label>
         <ion-input [(ngModel)]="city" name="city" type="text">
              </ion-input>
            </ion-item>
            <ion-item>
                <ion-label fixed>
                  State
                </ion-label>
        <ion-input [(ngModel)]="state" name="state" type="text">
                </ion-input>
            </ion-item>
            <br/>
     <button ion-button type="submit" block>Save Changes</button>
          </form> 
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>
</ion-content>
```

### home.scss

```css
.txtNewUser {
    color: #00aae7;
}
.lButton{
    width: 105%;
    text-transform: none;
    background-color: #d33257
}

```
### location.ts

```javascript
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  city:string;
  state:string;  

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) { 
    this.storage.get('location').then((val) =>{
      if(val != null) {
        let location = JSON.parse(val);
        this.city = location.city;
        this.state = location.state;
      } else {
        this.city = 'visakhapatnam';
        this.state = 'Andhra pradesh';
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  saveForm(){
    let location = {
      city: this.city,
      state: this.state
    }
    //console.log(location);
    this.storage.set('location', JSON.stringify(location));
    this.navCtrl.push('WeatherPage');
  }
}

```

### weather.html

```html
<ion-header>
  <ion-navbar  color="primary">
    <ion-title >
      Weather App 
    </ion-title>
  </ion-navbar>
</ion-header>
<ion-content padding style="background-color: rgb(0, 174, 255)">       
  <!--Display only if the data is loaded -->
  <ion-grid *ngIf = "weather">
    <ion-row>
      <ion-col width-50 offset-25>
        <!-- Displaying weather location -->
        <h2 class="location">{{weather.display_location.full}}</h2>
        
        <!--Displaying weather icon -->
        <div class="icon"><img src="{{weather.icon_url}}"></div>

        <!-- Displaying weather description -->
        <h3 class="desc">{{weather.weather}}</h3>

        <!-- Displaying temperature in Farenhite-->
        <h1 class="temp">{{weather.temp_f}}&deg;</h1>
          
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col width-100>
        <ion-list>
          <ion-item>
            <strong>Temperature: </strong> {{weather.temperature_string}}
          </ion-item>
          <ion-item>
            <strong>Relative Humidity: </strong> {{weather.relative_humidity}}
          </ion-item>
          <ion-item>
              <strong>Feels like: </strong> {{weather.feelslike_string}}
            </ion-item>
          <ion-item>
            <strong>Dewpoint: </strong> {{weather.dewpoint_string}}
          </ion-item>
          <ion-item>
              <strong>Visibility: </strong> {{weather.visibility_mi}}
          </ion-item>
          <ion-item>
              <strong>Heat Index: </strong> {{weather.heat_index_string}}
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>
</ion-content>
```

### weather.ts

```javascript
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from  '@ionic/storage'
import { WeatherProvider } from '../../providers/weather/weather'
@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  weather:any;              
  location: {      
    city:string,
    state: string
  }  
  constructor(public navCtrl: NavController, private weatherProvider: WeatherProvider, private storage: Storage) 
{}
  ionViewWillEnter(){  
    this.storage.get('location').then((val) => {
      if(val != null) {  
          this.location = JSON.parse(val);
      } else {
        this.location = {
          city: 'Miami',
          state: 'FL'
        }
      }
      this.weatherProvider.getWeather(this.location.city, this.location.state).subscribe(
        weather =>{
   this.weather = weather.current_observation;
        }
      );
    });
  }
}
```

### WeatherProvider.ts

```javascript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherProvider {
 
  apiKey = 'a8449ff9f8d33572';
  url: string;

  constructor(public http: Http) {
    console.log('Hello ApiConsumingProvider Provider');
    this.url = 'http://api.wunderground.com/api/'+this.apiKey+'/conditions/q';
  }  

  getWeather(city, state) {
    return this.http.get(this.url+'/'+state+'/'+city+'.json')
           .map(result => result.json());
  }
}
```

### theme/variable.scss 

```css
$colors: (
  primary:    #488aff,
  secondary:  #32db64,
  danger:     #f53d3d,
  light:      #f4f4f4,
  dark:       #222
);
```