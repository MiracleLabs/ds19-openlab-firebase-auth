# DS19 Open Lab | Login Functionality with Ionic and Firebase Authentication

The below file consists of commands and code snippets that will help you complete and understand the lab - Login Functionality with Ionic and Firebase Authentication.

## Commands

### Install Cordova 

```shell
npm install -g cordova
```
### Install Ionic Framework

```shell
npm install -g ionic
```

### Create an Ionic application

```shell
ionic start <your-application-name> blank
```

### Create a page in Ionic application

```shell
ionic g page <your-page-name>
```
### Create a provider in Ionic application

```shell
ionic g service <your-service-name>
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
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterPage } from './register/register.page';
import { HomePage } from './home/home.page';
import {FormsModule} from '@angular/forms';
import { SuccessPage } from './success/success.page';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from 'angularfire2/auth'
import * as firebase from 'firebase';
export var firebaseConfig = {
  apiKey: "AIzaSyC0IG8U9DtM2KpQXPPdNTunPaVi6ozdjT8",
  authDomain: "fir-auth-55a08.firebaseapp.com",
  databaseURL: "https://fir-auth-55a08.firebaseio.com",
  projectId: "fir-auth-55a08",
  storageBucket: "fir-auth-55a08.appspot.com",
  messagingSenderId: "862599803671",
  appId: "1:862599803671:web:9566e61aecbd53f4437d52",
  measurementId: "G-Z51LW1SB2S"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [AppComponent,RegisterPage,HomePage,SuccessPage],
  entryComponents: [],
  imports: [ AngularFireModule.initializeApp(firebaseConfig),AngularFireAuthModule,FormsModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

```

### home.html

```html
<ion-app>
  <ion-header translucent>
    <ion-toolbar color="primary">
      <ion-title  text-center>DS'19 FireBase Authentication</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
      <div >     
          <img style="max-width: 27%; margin: 3px 3px 2px 118px" src="assets/imgs/DS19_logo.png" >
        </div>
    <form >
      <ion-list lines="full" class="ion-no-margin ion-no-padding">
        
        <ion-item>
          <ion-label position="stacked">UserName<ion-text color="danger">*</ion-text></ion-label>
          <ion-input required type="text" name="username" [(ngModel)]="username"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Password<ion-text color="danger">*</ion-text></ion-label>
          <ion-input required type="password" name="password" [(ngModel)]="password"></ion-input>
        </ion-item>

      </ion-list>

      <div class="ion-padding">
        <ion-button expand="block"  type="submit" style="background-color: #d33257" (click)="login()">Login</ion-button>
      </div>
      <h4 style=" color: #00aae7;" text-center  routerLink='/register' >Register Here</h4>
    </form>
    <div text-center>
        <img  style="max-width: 87%;"src="assets/imgs/Miracle_Black.png">
      </div>
  </ion-content>
  <ion-footer>
      <ion-toolbar color="dark">
        <ion-title text-center> Built by
          <strong>Miracle’s</strong>
          <strong style="color:#00bfff;"> Innovation Labs</strong>   
        </ion-title>
      </ion-toolbar>  
    </ion-footer>
</ion-app>
```

### home.scss

```css
.lButton{
        width: 105%;
        text-transform: none;
        background-color: #d33257
    }
    
    itool{
        background-color: #d33257
    }

```
### home.ts

```javascript
import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public toastController: ToastController,private route:Router,public fAuth: AngularFireAuth,public alertController: AlertController){
  }
  username
  password
async presentToast() {
  const toast = await this.toastController.create({
    message: 'Login SuccessFul.',
    duration: 2000
  });
  toast.present();
}
async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Invalid User',
    message: 'Please Check Your Credentials.',
    buttons: ['OK']
  });

 await alert.present();
}

//login function
async login() {
  try {
    var r = await this.fAuth.auth.signInWithEmailAndPassword(
      this.username,
      this.password
    );
      
    if (r) {
      console.log("Successfully logged in!",r);
      this.presentToast()
      this.route.navigateByUrl('success');
      this.username=""
      this.password=""
    }

  } catch (err) {
    console.error("err",err);
    this.presentAlert()
    this.username=""
    this.password=""
}

}
}



```

### register.html

```html
<ion-app>
  <ion-header translucent>
    <ion-toolbar color="primary">
      
      <ion-title>  <ion-icon  routerLink="/home" name="arrow-back"></ion-icon>   Register Here!!</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <form>
      <ion-list lines="full" class="ion-no-margin ion-no-padding">
        <ion-item>
          <ion-label position="stacked">UserName<ion-text color="danger">*</ion-text>
          </ion-label>
          <ion-input required type="text" name="username" [(ngModel)]="username"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Password<ion-text color="danger">*</ion-text>
          </ion-label>
          <ion-input required type="password" name="password" [(ngModel)]="password"></ion-input>
        </ion-item>

      </ion-list>

      <div class="ion-padding">
        <ion-button expand="block" type="submit" class="ion-no-margin" (click)="register()"> Register</ion-button>
      </div>
    </form>
  </ion-content>
  <!-- <ion-alert-controller></ion-alert-controller> -->
  <ion-footer>
      <ion-toolbar color="dark">
        <ion-title text-center> Built by
          <strong>Miracle’s</strong>
          <strong style="color:#00bfff;"> Innovation Labs</strong>   
        </ion-title>
      </ion-toolbar>  
    </ion-footer>
</ion-app>
```

### register.ts
```
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {


  constructor(public toastController: ToastController,private route:Router,public fAuth: AngularFireAuth,public alertController: AlertController){
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'User Already Exists',
      message: 'Please Login.',
      buttons: ['OK']
    });
  
   await alert.present();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Registered Successfully',
      duration: 2000
    });
    toast.present();
  }
  username
  password
  ngOnInit() {
  }
// register function
  async register() {
    try {
      var r = await this.fAuth.auth.createUserWithEmailAndPassword( this.username,  this.password    );
      if (r) {
        console.log("Successfully registered!");
        this.presentToast()
        this.route.navigateByUrl('home');
        this.username=""
        this.password=""
      }

    } catch (err) {
      console.error(err);
      console.log("presentAlert()",this.presentAlert());
      this.presentAlert().then(()=>{
        this.route.navigateByUrl('home');
      })
      // setTimeout(() => {
      //   this.route.navigateByUrl('home');
      // }, 2000);
     

    }
  }

}

```

### success-page.html

```html
<ion-header>
  <ion-navbar color="headerColor">
    <ion-title text-center>
     Successfully Login
    </ion-title>
  </ion-navbar>
</ion-header>


<ion-content padding>
  <h4 text-center>Logged Succesfully</h4>
   <div text-center padding>
    <button  type="submit" ion-button class="lButton"  (click)="goBack()" >Go Back</button>
  </div>
</ion-content>
```

### success-page.ts

<ion-app>
  <ion-header translucent>
    <ion-toolbar color="primary">
        <ion-buttons>
      <ion-title text-center>Successfully Logged In </ion-title>
          <ion-button routerLink="/home"><ion-icon slot="end"  name="log-out"></ion-icon></ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <!-- <h3> Welcome to Digital Summit 2k19</h3> -->
    <ion-app>
        <ion-header>
          <ion-toolbar>
            <ion-title>Welcome to Digital Summit 2K19</ion-title>
           
          </ion-toolbar>
        </ion-header>
        <ion-content fullscreen>
          <ion-card>
              <img style="max-width: 73%;"src="assets/imgs/DS19_logo.png" >
            <ion-card-header>
              <!-- <ion-card-subtitle></ion-card-subtitle> -->
              <ion-card-title> Digital Summit is back! Starting from this December 12th to 15th, 2019 in Visakhapatnam</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                DS19 is all set and waiting to mesmerize you with some great career-building opportunities that embody, technical talks on cutting-edge technologies by topnotch experts, a 24-hour coding battle, job fair, and a fun-filled entertaining event, Hungama
            </ion-card-content>
          </ion-card>
        </ion-content>
      </ion-app>
    <!-- <ion-icon  size="large" name="log-out" routerLink='/home'></ion-icon> -->
  </ion-content>
  <!-- <ion-alert-controller></ion-alert-controller> -->
</ion-app>


### theme/variable.scss 

// Ionic Variables and Theming. For more info, please see:
// http://ionicframework.com/docs/theming/

/** Ionic CSS Variables **/
:root {
  /** primary **/
  --ion-color-primary: #d33257;
  // --ion-color-primary-rgb: 56, 128, 255;
  // --ion-color-primary-contrast: #ffffff;
  // --ion-color-primary-contrast-rgb: 255, 255, 255;
  // --ion-color-primary-shade: #3171e0;
  // --ion-color-primary-tint: #4c8dff;

  /** secondary **/
  --ion-color-secondary: #0cd1e8;
  --ion-color-secondary-rgb: 12, 209, 232;
  --ion-color-secondary-contrast: #ffffff;
  --ion-color-secondary-contrast-rgb: 255, 255, 255;
  --ion-color-secondary-shade: #0bb8cc;
  --ion-color-secondary-tint: #24d6ea;

  /** tertiary **/
  --ion-color-tertiary: #7044ff;
  --ion-color-tertiary-rgb: 112, 68, 255;
  --ion-color-tertiary-contrast: #ffffff;
  --ion-color-tertiary-contrast-rgb: 255, 255, 255;
  --ion-color-tertiary-shade: #633ce0;
  --ion-color-tertiary-tint: #7e57ff;

  /** success **/
  --ion-color-success: #10dc60;
  --ion-color-success-rgb: 16, 220, 96;
  --ion-color-success-contrast: #ffffff;
  --ion-color-success-contrast-rgb: 255, 255, 255;
  --ion-color-success-shade: #0ec254;
  --ion-color-success-tint: #28e070;

  /** warning **/
  --ion-color-warning: #ffce00;
  --ion-color-warning-rgb: 255, 206, 0;
  --ion-color-warning-contrast: #ffffff;
  --ion-color-warning-contrast-rgb: 255, 255, 255;
  --ion-color-warning-shade: #e0b500;
  --ion-color-warning-tint: #ffd31a;

  /** danger **/
  --ion-color-danger: #f04141;
  --ion-color-danger-rgb: 245, 61, 61;
  --ion-color-danger-contrast: #ffffff;
  --ion-color-danger-contrast-rgb: 255, 255, 255;
  --ion-color-danger-shade: #d33939;
  --ion-color-danger-tint: #f25454;

  /** dark **/
  --ion-color-dark: #222428;
  --ion-color-dark-rgb: 34, 34, 34;
  --ion-color-dark-contrast: #ffffff;
  --ion-color-dark-contrast-rgb: 255, 255, 255;
  --ion-color-dark-shade: #1e2023;
  --ion-color-dark-tint: #383a3e;

  /** medium **/
  --ion-color-medium: #989aa2;
  --ion-color-medium-rgb: 152, 154, 162;
  --ion-color-medium-contrast: #ffffff;
  --ion-color-medium-contrast-rgb: 255, 255, 255;
  --ion-color-medium-shade: #86888f;
  --ion-color-medium-tint: #a2a4ab;

  /** light **/
  --ion-color-light: #f4f5f8;
  --ion-color-light-rgb: 244, 244, 244;
  --ion-color-light-contrast: #000000;
  --ion-color-light-contrast-rgb: 0, 0, 0;
  --ion-color-light-shade: #d7d8da;
  --ion-color-light-tint: #f5f6f9;
}

```
