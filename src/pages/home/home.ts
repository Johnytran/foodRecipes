import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Food } from '../../models/food'
import { Recipe } from '../../models/recipe'
import { FoodProvider} from '../../providers/food/food';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public listFood: Array<Food> = [];
  public listRecipe: Array<Recipe> = [];
  constructor(public atrCtrl: AlertController, public storage: FoodProvider, private toastCtrl: ToastController) {
    if(this.storage.readData()){
      this.listFood = this.storage.readData();
    }
  }
  addNewRecipe(){
    let alert = this.atrCtrl.create({cssClass: "addRecipe"});
    alert.setTitle('Food selection');

    this.listFood.forEach((food)=>{
      alert.addInput({
        type: 'radio',
        label: food.name,
        value: food
      });
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        console.log(data);
      }
    });
    alert.present();
  }
  addFoodDoneMessage() {
    let toast = this.toastCtrl.create({
      message: 'Food was added successfully',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  removeFoodDoneMessage() {
    let toast = this.toastCtrl.create({
      message: 'Food was removed successfully',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  deleteFood(fd: Food){
    let alert = this.atrCtrl.create({
    title: 'Confirm Delete',
    message: 'Delete this food?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Yes',
        handler: () => {
          this.listFood.splice(this.listFood.indexOf(fd),1);
          this.storage.storeData(this.listFood);
          this.removeFoodDoneMessage();
          //console.log(this.listFood);
        }
      }
    ]
    });
    alert.present();
  }
  addFood(fName:string){
    let aFood = new Food(fName);
    this.listFood.push(aFood);
    this.storage.storeData(this.listFood);
    this.addFoodDoneMessage();
  }
  showAddFood() {

    let alert = this.atrCtrl.create({
      title: 'Add a food',
      inputs: [
        {
          name: 'foodname',
          placeholder: 'Food name'
        }
      ],
      cssClass: "addFood"
      ,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: ' Add ',
          handler: data => {
            if (data.foodname.trim().length >0) {
              this.addFood(data.foodname);
              data.foodname = '';
            } else {

              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
}
