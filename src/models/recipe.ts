export class Recipe{
  name: string;
  intro: string;
  id: string;
  description: string;
  constructor(name){
    this.name = name;
    this.id = (new Date().getTime()).toString();
  }
}
