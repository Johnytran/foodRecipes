import { Recipe } from '../models/recipe';
export class Food{
  name: string;
  elements: Array<Recipe>;
  constructor(name){
    this.name = name;
  }
  addRecipe(rcp: Recipe){
    this.elements.push(rcp);
  }
}
