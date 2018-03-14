import {Component} from '@angular/core';
import {LoadingController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {HTTP} from '@ionic-native/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private contact: FormGroup;

  constructor(private loadingCtrl: LoadingController, private http: HTTP,
              private formBuilder: FormBuilder, private alertCtrl: AlertController) {
    this.contact = this.formBuilder.group({
      email: ['', Validators.email]
    });
  }

  saveEmail() {
    console.log('saved', this.contact.value);
    if (this.contact.valid) {
      this.presentLoading(`Saving... ${this.contact.value.email}`);
      this.http.get('https://script.google.com/macros/s/AKfycbxXLZYReQ0s4ZzVSOkHbKci3ITEcnhMnuv4BwfzfiJH2MpkoN4/exec',
        {"email_field": this.contact.value.email}, {})
        .then(data => {
          console.log(data.status);
          console.log(data.data); // data received by server
          console.log(data.headers);

        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.presentAlert(this.contact.value.email);
    }
  }

  presentAlert(email: string) {
    let alert = this.alertCtrl.create({
      title: 'Invalid email',
      subTitle: `${email} is not valid`,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentLoading(message: string, duration: number = 2000) {
    this.loadingCtrl.create({
      content: message,
      duration: 2000,
      dismissOnPageChange: true
    }).present();
  }
}
