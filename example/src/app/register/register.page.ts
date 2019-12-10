import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public toastController: ToastController, private route: Router, public fAuth: AngularFireAuth, public alertController: AlertController) {
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
      var r = await this.fAuth.auth.createUserWithEmailAndPassword(this.username, this.password);
      if (r) {
        console.log("Successfully registered!");
        this.presentToast()
        this.route.navigateByUrl('home');
        this.username = ""
        this.password = ""
      }
    } catch (err) {
      console.error(err);
      console.log("presentAlert()", this.presentAlert());
      this.presentAlert().then(() => {
        this.route.navigateByUrl('home');
      })
    }
  }

}
