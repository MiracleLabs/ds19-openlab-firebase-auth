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
