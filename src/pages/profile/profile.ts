import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth} from 'angularfire2/auth';
import { finalize } from 'rxjs/operators';
import {Observable} from 'rxjs/Rx';
import { ToastController } from 'ionic-angular';

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
  user: Observable<firebase.User>;
  email: string;
  name: string;
  photo: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, private storage: AngularFireStorage,
    private afAuth: AngularFireAuth, private toastCtrl: ToastController) {
    this.user = afAuth.authState;
    this.afAuth.authState.subscribe(data => {
      this.photo = data.photoURL;
      this.email = data.email;
      this.name = data.displayName;
      console.log(data);
    });
  }
  updateProfile(){
    this.afAuth.auth.currentUser.updateProfile({
      displayName: this.name,
      email: this.email,
      photoURL: this.photo

    }).then(() => {
      this.showMessage('profile is updated.');
    }).catch((err: any) => {
      this.showMessage(err);
    });

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
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();

            this.downloadURL.subscribe(url=>{
               if(url){
                  this.photo = url;
               }
            })
            //console.log(this.photo);
            this.showMessage('the image is uploaded');
          } )

       ).subscribe();
    }else{
      this.showMessage('file not found');

    }


  }
  showMessage(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
