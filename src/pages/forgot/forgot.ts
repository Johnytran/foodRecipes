import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';

/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {
  private email: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afAuth: AngularFireAuth, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }
  reset(){
    return this.afAuth.auth.sendPasswordResetEmail(this.email)
      .then(() =>{
      this.showMessage('sent Password Reset Email');
      this.navCtrl.setRoot(SigninPage);
      this.navCtrl.popToRoot();}
      )
      .catch((error) => this.showMessage(error));
  }
  showMessage(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
