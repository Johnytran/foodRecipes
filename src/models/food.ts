import { Recipe } from '../models/recipe';
export class Food{
  id: string;
  name: string;
  recipes: Array<Recipe>=[];
  constructor(name){
    this.name = name;
    this.id = (new Date().getTime()).toString();
  }
}
