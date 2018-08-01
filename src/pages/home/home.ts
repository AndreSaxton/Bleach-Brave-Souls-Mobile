import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
//import { AttrAst } from '../../../node_modules/@angular/compiler';
//import { AddCharacter } from 'ionic-angular';
//import { Characters } from 'ionic-angular';
//import { AddCharacter } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   public items : Array<any> = [];
   //public stars : any = [1,2,3];
   public stars : Array<any>=[];
   public a: Array<any>=[];

   constructor(public navCtrl: NavController,
               public http   : HttpClient)
   {

   }

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
         //console.dir(data);
         this.items = data;
         //this.stars = this.items.cd_star;
         console.log(this.items);
         for(let cont = 0; cont<this.items.length ;cont++){
          this.stars[cont] = this.items[cont].qt_star;
         }
         console.log(this.stars);
         
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

   addMaterials(){
      this.navCtrl.push('AddMaterialPage');
   }
}