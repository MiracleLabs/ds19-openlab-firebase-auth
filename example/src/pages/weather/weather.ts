import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from  '@ionic/storage'
import { WeatherProvider } from '../../providers/weather/weather';

/**      
 * Generated class for the WeatherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  
  weather:any;              

  //object
  location: {      
    city:string,
    state: string
  }  

  constructor(public navCtrl: NavController, private weatherProvider: WeatherProvider, private storage: Storage) {
  
  }   

  
  ionViewWillEnter(){  

    this.storage.get('location').then((val) => {
      if(val != null) {  
          this.location = JSON.parse(val);
      } else {
        this.location = {
          city: 'visakhapatnam',
          state: 'Andhra pradesh'  
        }
      }

      this.weatherProvider.getWeather(this.location.city, this.location.state).subscribe(
        weather =>{
          // console.log(JSON.stringify(weather));
          this.weather = weather.current_observation;
           console.log(JSON.stringify(weather));
        }
      );
                       
    });
     
  }

}
