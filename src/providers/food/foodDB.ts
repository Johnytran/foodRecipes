import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Food } from '../../models/food'
import { Recipe } from '../../models/recipe'
/*
  Generated class for the FoodProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FoodDBProvider {
  items: Observable<any[]>;
  constructor(public db: AngularFireDatabase) {
  }
  getListFood(){
    return new Promise((resolve, reject)=>{
      this.db.object('food').snapshotChanges().subscribe( (action) => {
        if( action.payload.val() ){
          resolve( this.unwrapClasses( action.payload.val() ) );
        }
        else{
          reject(new Error('no data'));
        }
      });
    });

  }
  addFood(aFood: Food){

    return new Promise((resolve, reject)=>{
      let result: any = this.db.object('food/'+aFood.id).set({name: aFood.name});
      if(result){
        resolve("the food is added");
      }else{
        reject(new Error('error insert'));
      }
    });
  }
  addRecipe(foodID: string, rp: Recipe){

    return new Promise((resolve, reject)=>{
      let refFood = this.db.object('food/'+foodID+'/recipes/'+rp.id);

      let recipe = {
          'name': rp.name
      };
      let result: any = refFood.update(recipe);
      if(result){
        resolve("the recipe is added");
      }else{
        reject(new Error('error insert'));
      }
    });
  }

  removeRecipe(foodID: string, recipeID: string){
    return new Promise((resolve, reject)=>{
      console.log('food/'+foodID+'recipes/'+recipeID);
      let result: any = this.db.object('food/'+foodID+'/recipes/'+recipeID).remove();
      if(result){
        resolve("the recipe is deleted");
      }else{
        reject(new Error('error delete'));
      }
    });
  }

  removeFood(aFood: Food){
    return new Promise((resolve, reject)=>{
      let result: any = this.db.object('food/'+aFood.id).remove();
      if(result){
        resolve("the food is deleted");
      }else{
        reject(new Error('error delete'));
      }
    });
  }
  unwrapClasses( classes ){
      let count = Object.keys(classes).length;
      let keys = Object.keys(classes);
      let classList:Array<any> = [];
      for(let i:number =0; i< count; i++){
        let item = classes[ keys[i] ];
        item.id = keys[i];
        classList.push( item );
      }
      return classList;
  }
}
