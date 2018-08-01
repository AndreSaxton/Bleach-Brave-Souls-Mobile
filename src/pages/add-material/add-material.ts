import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-add-material',
  templateUrl: 'add-material.html',
})
export class AddMaterialPage {

  constructor(public navCtrl    : NavController,
               public http       : HttpClient,
               public NP         : NavParams,
               public fb         : FormBuilder,
               public toastCtrl  : ToastController)
   {

      // Create form builder validation rules
      this.form = fb.group({
         "charBase" 	: ["", Validators.required],
         "quant"		: ["", Validators.required],         
         "charMaterial"	: ["", Validators.required]
      });

   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMaterialPage');
  }



  ionViewWillEnter() : void
   {
      this.resetFields();

      this.loadCharacters();

      if(this.NP.get("record"))
      {
         this.isEdited      = true;
         this.selectEntry(this.NP.get("record"));
         this.pageTitle     = 'Amend entry';
      }
      else
      {
         this.isEdited      = false;
         this.pageTitle     = 'Create entry';
      }

      
   }




   
   public form                   : FormGroup;

   public charBase   	: any;
   public charMaterial	: any;
   public qtChar     	: any;

   public characters : any;

   public isEdited               : boolean = false;
   public hideForm               : boolean = false;
   public pageTitle              : string;
   public recordID               : any      = null;
   private baseURI               : string  = "http://localhost/bleach_brave_souls/";

   selectEntry(item : any) : void
   {
      this.charBase 	= item.nm_characters;
      this.charMaterial = item.nm_characters;
      this.qtChar  		= item.qt_characters;
      this.recordID 	= item.cd_characters;
   }

   createEntry(charBase : number, quant : number, charMaterial : number) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "create", "charBase" : charBase, "quant" : quant, "charMaterial" : charMaterial},
          url       : any      	= this.baseURI + "manage-data-material.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         this.hideForm   = true;
         this.sendNotification(`Congratulations the technology was successfully added`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!');

         console.dir(error);
         console.dir(name);console.dir(quant);
      });
   }

   updateEntry(charBase : number, quant : number, charMaterial : number) : void
   {
      let headers 	: any	= new HttpHeaders({ 'Content-Type': 'application/json' }),          
          options   : any   = { "key" : "update", "charBase" : charBase, "quant" : quant, "charMaterial" : charMaterial, "recordID" : this.recordID},
          url       : any      	= this.baseURI + "manage-data-material.php";

      this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data =>
      {
         // If the request was successful notify the user
         this.hideForm  =  true;
         this.sendNotification(`Congratulations the technology was successfully updated`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!Update');
         console.log(error);
      });
   }

   deleteEntry() : void
   {
    	let charBase 	: string = this.form.controls["charBase"].value,
    		quant    	: number = this.form.controls["quant"].value,
      		charMaterial: number = this.form.controls["charMaterial"].value;

      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options   : any   = { "key" : "delete", "charBase" : charBase, "quant" : quant, "charMaterial" : charMaterial, "recordID" : this.recordID},
          url       : any      	= this.baseURI + "manage-data-material.php";

      this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data =>
      {
         this.hideForm     = true;
         this.sendNotification(`Congratulations the technology was successfully deleted`);
         console.log(data);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!delete');
         console.log(error);
      });
   }

   saveEntry() : void
   {   
      let charBase 	 : number = this.form.controls["charBase"].value,
      	quant  		 : number = this.form.controls["quant"].value,
      	charMaterial : number = this.form.controls["charMaterial"].value;

      if(this.isEdited)
      {
         this.updateEntry(charBase, charMaterial, quant);
      }
      else
      {      
         this.createEntry(charBase, charMaterial, quant);
      }
   }

   resetFields() : void
   {
      this.charBase = "";      
   }

   sendNotification(message : string)  : void
   {
      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notification.present();
   }

  loadCharacters():void{
    this.http.get('http://localhost/bleach_brave_souls/retrieve-data-chars.php').subscribe((data : any) =>
      {
         console.dir(data);
         this.characters = data;
      },
      (error : any) =>
      {
         console.dir(error);
      });  
  }

}
