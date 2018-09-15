import { Component } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProfilePage;

  constructor() {

  }
}
