import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { SignupPage } from '../signup/signup'
import { ForgotPage } from '../forgot/forgot'
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth) {
  }
  signIn(){
    this.afAuth
      .auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(value => {
        this.email = this.password = '';
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
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
