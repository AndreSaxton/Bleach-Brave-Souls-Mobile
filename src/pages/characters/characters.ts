import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the CharactersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-characters',
  templateUrl: 'characters.html',
})
export class CharactersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http   : HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CharactersPage');
  }

  public items : Array<any> = [];  

   ionViewWillEnter() : void
   {
      this.load();
   }

   load() : void
   {   
      this.http
      .get('http://localhost/bleach_brave_souls/retrieve-data-chars.php')
      .subscribe((data : any) =>
      {
         console.dir(data);
         this.items = data;
      },
      (error : any) =>
      {
         console.dir(error);
      });
   }

   addEntry() : void
   {
      this.navCtrl.push('AddCharacterPage');
   }

   viewEntry(param : any) : void
   {
      this.navCtrl.push('AddCharacterPage', param);
   }

   viewChars(){
      this.navCtrl.push('CharactersPage');
   }


}
