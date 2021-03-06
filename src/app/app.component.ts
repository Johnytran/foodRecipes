import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs'
import { AngularFireStorage } from 'angularfire2/storage';

import { SigninPage } from '../pages/signin/signin'
import { AngularFireAuth} from 'angularfire2/auth';


@Component({
  templateUrl: 'app.html'

})
export class MyApp {
  rootPage:any = TabsPage;
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen, public storage: AngularFireStorage,
    public afAuth: AngularFireAuth){
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this.afAuth.authState.subscribe((user)=>{
        if(user){
          // user is authenticated
          this.rootPage = TabsPage;
        }else{
        // user is not authenticated
        this.rootPage = SigninPage;
      }
      });
    });
  }
}
