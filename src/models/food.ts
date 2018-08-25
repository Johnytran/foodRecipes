import { Recipe } from '../models/recipe';
export class Food{
  name: string;
  recipes: Array<Recipe>=[];
  constructor(name){
    this.name = name;
  }
}
