import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth} from 'angularfire2/auth';
import { finalize } from 'rxjs/operators';
import {Observable} from 'rxjs/Rx';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(public navCtrl: NavController,
    public navParams: NavParams, private storage: AngularFireStorage,
    private afAuth: AngularFireAuth) {

  }
  signOut(){
    this.afAuth.auth.signOut();
  }
  uploadFile(event) {
    const file = event.target.files[0];
    let filename = file.name.split('.');
    if(filename.length>0){
      const filePath = filename[0];
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      // observe percentage changes

      this.uploadPercent = task.percentageChanges();
      // get notified when the download URL is available
      task.snapshotChanges().pipe(
          finalize(() => this.downloadURL = fileRef.getDownloadURL() )

       ).subscribe();
    }else{
      console.log('file not found');
    }


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
