import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Food } from '../../models/food'
import { Recipe } from '../../models/recipe'
import { Greeter } from '../../models/greet'
import { FoodProvider} from '../../providers/food/food';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public listFood: Array<Food> = [];
  note_recipe: string='';
  constructor(public atrCtrl: AlertController, public storage: FoodProvider, private toastCtrl: ToastController) {
    if(this.storage.readData()){
      this.listFood = this.storage.readData();
    }
    //console.log(JSON.stringify(this.listFood));
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
        //console.log(JSON.stringify(this.listFood));
        if(this.note_recipe.trim().length >0){
          this.listFood.forEach((item)=>{
            console.log(JSON.stringify(item.recipes));
            if(item.name == data.name){
              let tempRecipe: Recipe = new Recipe(this.note_recipe.trim());
              if(item.recipes.push(tempRecipe)){
                this.addRecipeDoneMessage();
                this.note_recipe = "";
              }
              //console.log(JSON.stringify(item));

            }
            // console.log(JSON.stringify(item));
          });
          this.storage.storeData(this.listFood);
        }
        //console.log(this.listFood);
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
  addRecipeDoneMessage() {
    let toast = this.toastCtrl.create({
      message: 'Recipe was added successfully',
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
    cssClass: "addFood"
    ,
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
    let aFood:Food = new Food(fName);
    //console.log(JSON.stringify(aFood));
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
