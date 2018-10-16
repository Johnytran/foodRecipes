import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Food } from '../../models/food'
import { Recipe } from '../../models/recipe'
import { AngularFireAuth} from 'angularfire2/auth';
/*
  Generated class for the FoodProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FoodDBProvider {
  items: Observable<any[]>;
  constructor(public db: AngularFireDatabase,
              private afAuth: AngularFireAuth) {
  }
  getListFood(){
    try{
      return new Promise((resolve, reject)=>{
        try{
          this.db.object('food').snapshotChanges().subscribe( (action) => {
            try{
              if( action.payload.val() ){
                resolve( this.unwrapClasses( action.payload.val() ) );
              }
              else{
                reject(new Error('no data'));
              }
            }catch{}

          });
        }catch(error){
          console.log(error);
          return null;
        }

      });
    }catch{}


  }
  addFood(aFood: Food){
    try{
      return new Promise((resolve, reject)=>{
        try{
          let foodRef: any = this.db.object('food/'+aFood.id);

          this.afAuth.authState.subscribe((user)=>{
            if(user){
              // user is authenticated
              //console.log(user.uid);

              let result: any = foodRef.set({name: aFood.name, userID: user.uid});
              if(result){
                resolve("the food is added");
              }else{
                reject(new Error('error insert'));
              }
            }
          });
        }catch(error){
          console.log(error);
          return null;
        }
      });
    }catch{}



  }
  addRecipe(foodID: string, rp: Recipe){
    try{
      return new Promise((resolve, reject)=>{
        try{
          let refFood = this.db.object('food/'+foodID+'/recipes/'+rp.id);

          let recipe = {
              'name': rp.name,
              'intro': rp.intro
          };
          //console.log(recipe);
          let result: any = refFood.update(recipe);
          if(result){
            resolve("the recipe is added");
          }else{
            reject(new Error('error insert'));
          }
        }catch(error){
          console.log(error);
          return null;
        }
      });
    }catch{}



  }

  updateRecipe(foodID: string, rp: Recipe){
    try{
      return new Promise((resolve, reject)=>{
        try{
          let refFood = this.db.object('food/'+foodID+'/recipes/'+rp.id);

          let recipe = {
              'name': rp.name,
              'intro': rp.intro,
              'description': rp.description
          };
          //console.log(recipe);
          let result: any = refFood.update(recipe);
          if(result){
            resolve("the recipe is updated");
          }else{
            reject(new Error('error updating'));
          }

        }catch(error){
          console.log(error);
          return null;
        }
      });
    }catch{}


  }
  removeRecipe(foodID: string, recipeID: string){
    try{
      return new Promise((resolve, reject)=>{
        try{
          //console.log('food/'+foodID+'recipes/'+recipeID);
          let result: any = this.db.object('food/'+foodID+'/recipes/'+recipeID).remove();
          if(result){
            resolve("the recipe is deleted");
          }else{
            reject(new Error('error delete'));
          }
        }catch(error){
          console.log(error);
          return null;
        }
      });
    }catch{}



  }

  removeFood(aFood: Food){
    try{
      return new Promise((resolve, reject)=>{
        try{
          let result: any = this.db.object('food/'+aFood.id).remove();
          if(result){
            resolve("the food is deleted");
          }else{
            reject(new Error('error delete'));
          }
        }catch(error){
          console.log(error);
          return null;
        }
      });
    }catch{}



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
