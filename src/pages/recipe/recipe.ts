import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Rx';
import { ToastController } from 'ionic-angular';
import { FoodDBProvider} from '../../providers/food/foodDB';
import { Food } from '../../models/food'
import { Recipe } from '../../models/recipe'

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
  htmlContent: string='';
  intro_text: string='';
  options: Object = {
    placeholder: "Recipe described here",
    events : {
      'froalaEditor.image.beforeUpload' : function(e, editor, response) {
        //var url = parseResponse(response);
      },
      'froalaEditor.image.inserted' : function(e, editor, img, response) {
        //console.log(img);
      }
    },
    charCounterCount: true,
    // Set the image upload parameter.
    imageUploadParam: 'image_param',

    // Set the image upload URL.
    //imageUploadURL: '/recipes_article',

    // Additional upload params.
    imageUploadParams: {id: 'froala'},

    // Set request type.
    imageUploadMethod: 'POST',

    // Set max image size to 5MB.
    imageMaxSize: 5 * 1024 * 1024,

    // Allow to upload PNG and JPG.
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
          toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'color', 'emoticons', '-', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'indent', 'outdent', '-', 'insertImage', 'insertLink', 'insertFile', 'insertVideo', 'undo']
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
            private afAuth: AngularFireAuth, private toastCtrl: ToastController,
            public storageDB: FoodDBProvider) {
      FileReader.prototype.addEventListener = function (eventType, event) {
         this.onloadend = event;
       };
    this.foodPass = this.navParams.get('food');
    this.intro_text = this.foodPass.recipes[0].intro;
    this.htmlContent = this.foodPass.recipes[0].description;
    this.afAuth.authState.subscribe((user)=>{
      if(user){
        // user is authenticated
        //console.log(user.uid);
        this.uid = user.uid;
      }
    });
    //console.log(this.foodPass);
  }
  updateRecipe(){
    //console.log(this.htmlContent);
    let desc = this.htmlContent.trim();
    if(desc.length >0){
      let tempRecipe: Recipe = this.foodPass.recipes[0];
      tempRecipe.description = desc;
      tempRecipe.intro = this.intro_text;
      //console.log(this.intro);
      this.storageDB.updateRecipe(this.foodPass.id, tempRecipe).then((result)=>{
        this.showMessage(result.toString());


      }).catch((err: any)=>{
        this.showMessage(err);
        console.log(err);
      });

    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }
  showMessage(msg: string){
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
