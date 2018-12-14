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
