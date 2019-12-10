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

