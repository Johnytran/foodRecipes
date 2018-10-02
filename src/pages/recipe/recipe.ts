import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Food } from '../../models/food'
import { AngularFireAuth} from 'angularfire2/auth';

/**
 * Generated class for the RecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {
  foodPass: Food;
  user: Observable<firebase.User>;
  uid: string='';
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private afAuth: AngularFireAuth) {
    this.foodPass = this.navParams.get('food');
    this.afAuth.authState.subscribe((user)=>{
      if(user){
        // user is authenticated
        //console.log(user.uid);
        this.uid = user.uid;
      }
    });
    console.log(this.foodPass);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

}
