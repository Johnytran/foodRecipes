import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Food } from '../../models/food'
import { Recipe } from '../../models/recipe'
import { FoodProvider} from '../../providers/food/food';
import { FoodDBProvider} from '../../providers/food/foodDB';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public listFood: Array<Food> = [];
  note_recipe: string='';
  expand: string='none';
  intro: string;
  constructor(public atrCtrl: AlertController, public storage: FoodProvider,
    private toastCtrl: ToastController, public storageDB: FoodDBProvider) {
    // from local storage
    // if(this.storage.readData()){
    //   this.listFood = this.storage.readData();
    // }
    //console.log(JSON.stringify(this.listFood));

    // from firebase
    this.displayFoodFireBase();
    //console.log(this.listFood);
    this.showMessageGuide('Add recipe intro','midle');
  }
  showMessageGuide(msg: string, ps: string){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',
      cssClass: 'toastAfterHeader'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  expandIntro(){
    if(this.expand=='none'){
      this.expand = 'block';
    }else{
      this.expand = 'none';
    }
  }
  displayFoodFireBase(){
    this.listFood = [];
    this.storageDB.getListFood().then((data)=>{
      //console.log(data.length );
      if(Array.isArray(data)){
        data.forEach((item)=>{
          let aFood: Food = new Food(item['name']);
          aFood.id = item['id'];

          if(typeof item['recipes'] !== "undefined"){
            let recipes:any = this.storageDB.unwrapClasses(item['recipes']);
            aFood.recipes = recipes;
          }

          this.listFood.push(aFood);
        });
      }

    }).catch((err: any)=>{

    });
  }
  addNewRecipe(){
    let alert = this.atrCtrl.create({cssClass: "addRecipe"});
    alert.setTitle('Food selection');

    this.listFood.forEach((food)=>{
      alert.addInput({
        type: 'radio',
        label: food.name,
        value: food.id
      });
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {

        if(this.note_recipe.trim().length >0){
          // this.listFood.forEach((item)=>{
          //
          //   if(item.id == data){
          //     //console.log(JSON.stringify(this.note_recipe));
          //     let tempRecipe: Recipe = new Recipe(this.note_recipe.trim());
          //
          //     if(item.recipes.push(tempRecipe)){
          //       this.addRecipeDoneMessage();
          //       this.note_recipe = "";
          //     }
          //   }
          //
          // });
          // this.storage.storeData(this.listFood);

          let tempRecipe: Recipe = new Recipe(this.note_recipe.trim());
          tempRecipe.intro = this.intro;
          //console.log(this.intro);
          this.storageDB.addRecipe(data, tempRecipe).then((result)=>{
            this.showMessage(result.toString());
            this.note_recipe = "";
            this.displayFoodFireBase();
          }).catch((err: any)=>{
            this.showMessage(err);
            console.log(err);
          });

        }

      }
    });
    alert.present();
  }
  removeRecipe(fd: Food, rp: Recipe){
    let alert = this.atrCtrl.create({
    title: 'Confirm Delete',
    message: 'Delete this recipe?',
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
          // this.listFood.forEach((food)=>{
          //   if(food.name == fd.name){
          //     if(food.recipes.length>0){
          //       food.recipes.forEach((recipe)=>{
          //         if(recipe.name == rp.name){
          //           food.recipes.splice(food.recipes.indexOf(rp),1);
          //           this.storage.storeData(this.listFood);
          //           this.removeRecipeDoneMessage();
          //         }
          //       });
          //     }
          //
          //   }
          //   // console.log(JSON.stringify(item));
          // });
          // this.storage.storeData(this.listFood);
          this.storageDB.removeRecipe(fd.id, rp.id).then((result)=>{
            this.showMessage(result.toString());
            this.displayFoodFireBase();
          }).catch((err: any)=>{
            this.showMessage(err);
          });

        }
      }
    ]
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
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  removeRecipeDoneMessage() {
    let toast = this.toastCtrl.create({
      message: 'Recipe was removed successfully',
      duration: 3000,
      position: 'bottom'
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
          //this.listFood.splice(this.listFood.indexOf(fd),1);
          this.storageDB.removeFood(fd).then((result)=>{
            this.showMessage(result.toString());
            this.displayFoodFireBase();
          }).catch((err: any)=>{
            this.showMessage(err);
          });
          //this.storage.storeData(this.listFood);
          //this.removeFoodDoneMessage();
          //console.log(this.listFood);
        }
      }
    ]
    });
    alert.present();
  }
  addFood(fName:string){
    let aFood:Food = new Food(fName);
    this.storageDB.addFood(aFood).then((result)=>{
      this.showMessage(result.toString());
      this.displayFoodFireBase();
    }).catch((err: any)=>{
      this.showMessage(err);
    });
    //console.log(JSON.stringify(aFood));
    //this.listFood.push(aFood);
    //this.storage.storeData(this.listFood);


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
