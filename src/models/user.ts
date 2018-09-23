export class User{
  id: string;
  name: string;
  photo: string;
  email: string;
  constructor(name){
    this.name = name;
    //this.id = (new Date().getTime()).toString();
  }
}
