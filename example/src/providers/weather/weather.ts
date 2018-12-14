import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
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
