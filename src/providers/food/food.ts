import { Injectable } from '@angular/core';
import { Food } from '../../models/food';
/*
  Generated class for the FoodProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FoodProvider {

  constructor() {
    console.log('Hello FoodProvider Provider');
  }
  storeSetting(guide:string){
    window.localStorage.setItem('showGuide', guide);
  }
  readSetting(){
    return window.localStorage.getItem('showGuide');
  }
  storeData(data:Array<Food>){
    window.localStorage.setItem('foodsData', JSON.stringify(data));
  }
  readData(){
    try{
      let data = JSON.parse(window.localStorage.getItem('foodsData'));
      return data;
    }catch(error){
      console.log(error);
      return null;
    }
  }
}
