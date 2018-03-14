import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {

  }

  public contact = {
    email: ''
  };

  saveEmail() {
    console.log('saved', this.contact.email);

    this.presentLoading();
  }

  presentLoading() {
    this.loadingCtrl.create({
      content: `Please wait... ${this.contact.email}`,
      duration: 2000,
      dismissOnPageChange: true
    }).present();
  }
}
