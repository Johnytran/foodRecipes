import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Food } from '../../models/food'
import { FoodProvider} from '../../providers/food/food';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public listFood: Array<Food> = [];
  constructor(public atrCtrl: AlertController, public storage: FoodProvider, private toastCtrl: ToastController) {
    if(this.storage.readData()){
      this.listFood = this.storage.readData();
    }
  }
  addFoodDoneMessage() {
    let toast = this.toastCtrl.create({
      message: 'Food was added successfully',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
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
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
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
