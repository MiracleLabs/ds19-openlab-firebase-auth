# DS18 Open Lab | Login Functionality with Ionic and Firebase Authentication

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
ionic g provider <your-provider-name>
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

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Register } from '../pages/register/register';
import { Auth } from '../providers/auth';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { SuccesPage } from '../pages/succes-page/succes-page';


export const firebaseConfig = {
  apiKey: "<Api Key>",
  authDomain: "<Firebase Domain>",
  databaseURL: "<Database URL>",
  projectId: "<Firebase Project ID >",
  storageBucket: "<Storage Bucket>",
  messagingSenderId: "<Messaging Sender ID>"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Register,
    SuccesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Register,
    SuccesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Auth,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

```

### home.html

```html
<ion-header>
  <ion-navbar color="headerColor">
    <ion-title text-center>
      DS'18 Firebase Authentication
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding text-center>

  <!-- DS'18 Logo    -->
  <div >
    <img  src="assets/imgs/ds-logo.png" >
  </div>

  <!-- Login Form  -->
  <ion-item >
    <ion-label floating><ion-icon name="person" ></ion-icon>  Username</ion-label>
    <ion-input type="text"  [(ngModel)]="uname1" ></ion-input>
  </ion-item>

  <ion-item >
    <ion-label floating>  
      <ion-icon name="lock"></ion-icon> Password
    </ion-label>
       <ion-input type="password"  [(ngModel)]="pass1"></ion-input>
  </ion-item>

  <div text-center padding>
       <button  type="submit" ion-button class="lButton" block (click)="login(uname1,pass1)">Login</button>
  <h4 (click)="register()" class="txtNewUser">Register Here</h4>
  <div text-center>
    <img  src="assets/imgs/Miracle_Black.png">
  </div>

  </div>
</ion-content>

<ion-footer>
  <h6 class="copyRight" text-center> Miracle Software Systems, Inc. 2018 </h6>    
</ion-footer>

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
### home.ts

```javascript
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Register } from '../register/register';
import { Auth } from '../../providers/auth';
import { SuccesPage } from '../succes-page/succes-page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public auth:Auth) {

  }
  register() {
        this.navCtrl.push(Register);    
  }

  login(uname:string,pass:string){

        let credentials={
          "email":uname,
          "password":pass
        }
        this.auth.login(credentials)
        .then((data) => {
          console.log(data);
          this.navCtrl.setRoot(SuccesPage);
        });
      }
}

```

### register.html

```html
<!--
  Generated template for the Register page.

  See http://ionicframework.com/docs/components/#navigation for more info on
  Ionic pages and navigation.
-->
<ion-header>

  <ion-navbar color="headerColor">
    <ion-title >
      Register
    </ion-title>
  </ion-navbar>

</ion-header>

<ion-content padding>
  <div text-center>
    <img  src="assets/imgs/ds-logo.png" >  </div>

  <!-- Login Form  -->
  <ion-item >
    <ion-label floating><ion-icon name="person" ></ion-icon>  Username</ion-label>
    <ion-input type="text" [(ngModel)]="uname" ></ion-input>
  </ion-item>

  <ion-item class="login-signup">
    <ion-label floating>  
      <ion-icon name="lock"></ion-icon> Password
    </ion-label>
       <ion-input type="password" [(ngModel)]="pass" ></ion-input>
  </ion-item>

  <div text-center padding>
       <button  type="submit" ion-button class="lButton" (click)="register(uname,pass)" >Register Here</button>
  </div>

</ion-content>
```

### register.ts

```javascript
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';


/**
 * Generated class for the Register page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  loading: Loading;

  regResult;
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:Auth, public alertCtrl: AlertController){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }
  register(uname:string,pass:string){
    let credentials={
      "email":uname,
      "password":pass
    }
    this.auth.register(credentials).then((data) => {
      console.log(data);
      this.navCtrl.push(HomePage);
    });
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

```javascript
import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the SuccesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-succes-page',
  templateUrl: 'succes-page.html',
})
export class SuccesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuccesPage');
  }

  goBack(){
    this.navCtrl.push(HomePage);
  }
}
```

### auth.ts

```javascript
import { Injectable } from '@angular/core';
import {  FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class Auth {

  user: Observable<firebase.User>;

  constructor(afAuth: AngularFireAuth) {
    this.user = afAuth.authState;    
  }
  
  login(credentials: { email: string, password: string }) : Promise <any>{

   return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
      }

  register(credentials: { email: string, password: string }) : Promise<any> {
       return  firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password);
  }
}
```

### theme/variable.scss 

```css
$colors: (
  primary:     #488aff,
  secondary:   #32db64,
  danger:      #f53d3d,
  light:       #f4f4f4,
  dark:        #222,
  headerColor: #d33257
);
```
