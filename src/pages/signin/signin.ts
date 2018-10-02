import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { SignupPage } from '../signup/signup'
import { ForgotPage } from '../forgot/forgot'
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  private email: string;
  private password: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afAuth: AngularFireAuth, private toastCtrl: ToastController) {
  }
  signIn(){
    this.afAuth
      .auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(value => {
        this.email = this.password = '';
        this.showMessage('Nice, Welcome to recipe world!');
      })
      .catch(err => {
        this.showMessage('Something went wrong: '+ err.message);
      });
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
  signUp(){
    this.navCtrl.push(SignupPage);
  }
  forgotPass(){
    this.navCtrl.push(ForgotPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

}
