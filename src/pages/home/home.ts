import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public atrCtrl: AlertController) {

  }
  showPromptAlert() {
    let alert = this.atrCtrl.create({
      title: 'Add a food',
      inputs: [
        {
          name: 'foodname',
          placeholder: 'Food name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('You Clicked on Cancel');
          }
        },
        {
          text: 'Add',
          handler: data => {
            if (User.isValid(data.username)) {
              // login is valid
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
}
