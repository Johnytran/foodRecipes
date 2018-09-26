export class Recipe{
  name: string;
  id: string;
  constructor(name){
    this.name = name;
    this.id = (new Date().getTime()).toString();
  }
}
