import {Component} from '@angular/core';
import {Loading, LoadingController, AlertController, ToastController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ClientSubscribeServiceProvider} from "../../providers/client-subscribe-service/client-subscribe-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private contact: FormGroup;

  private loading;

  constructor(private loadingCtrl: LoadingController, private toastCtrl: ToastController,
              private formBuilder: FormBuilder, private alertCtrl: AlertController,
              private clientSubscribeService: ClientSubscribeServiceProvider) {
    this.contact = this.formBuilder.group({
      email: ['', Validators.email]
    });
  }

  saveEmail() {
    console.log('saved', this.contact.value);
    if (this.contact.valid) {
      this.loading = this.presentLoading(`Saving... ${this.contact.value.email}`);
      this.clientSubscribeService.saveCustomer(this.contact.value.email).subscribe(() => {
        this.loading.dismissAll();
        this.toastCtrl.create({
          message: `${this.contact.value.email} is successfully subscribed`,
          duration: 3000,
          position: 'middle'
        }).present();
        this.contact.reset();
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

  presentLoading(message: string): Loading {
    let loading = this.loadingCtrl.create({
      content: message,
      // duration: 2000,
      dismissOnPageChange: true
    });
    loading.present();
    return loading;
  }
}
