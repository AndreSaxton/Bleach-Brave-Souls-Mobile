import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { style } from '../../../node_modules/@angular/core/src/animation/dsl';

@IonicPage()
@Component({
  selector: 'page-add-character',
  templateUrl: 'add-character.html',
})
export class AddCharacterPage {

  constructor(public navCtrl    : NavController,
               public http       : HttpClient,
               public NP         : NavParams,
               public fb         : FormBuilder,
               public toastCtrl  : ToastController)
   {

      // Create form builder validation rules
      this.form = fb.group({
         "name"                  : ["", Validators.required],
         "quant"           : ["", Validators.required],
         "stars"                 : ["", Validators.required],
         "attribute"             : ["", Validators.required]
      });

   }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCharacterPage');
  }
//pra baixo é novo


  ionViewWillEnter() : void
   {
      this.resetFields();

      this.loadAttributes();
      this.loadStars();

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

   public charName   : any;

   public qtStar     : any;//mudar depois
   public stars     : any;//deixar so este
   public cdStars     : any;//deixar so este

   public attributes : any;
   public cdAttribute  : any;
   public qtChar     : any;
   public nmAttribute:string ;

   public isEdited               : boolean = false;
   public hideForm               : boolean = false;
   public pageTitle              : string;
   public recordID               : any      = null;
   private baseURI               : string  = "http://localhost/bleach_brave_souls/";

   selectEntry(item : any) : void
   {
      this.recordID = item.cd_characters;
      this.charName = item.nm_characters;
      this.qtChar   = item.qt_characters;
      /*this.qtStar   = item.cd_star;
      this.attributes= item.cd_attribute;*/
      this.cdStars = item.cd_star;
      //this.cdAttribute = item.cd_attribute;
      this.cdAttribute = item.cd_attribute;

      

      console.log(this.cdStars);
      console.log(this.cdAttribute);
      //console.log(this.cdAttribute);
      console.log(item);
   }

   createEntry(name : string, quant : number, star : number, attribute : number) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "create", "name" : name, "quant" : quant, "star" : star, "attribute" : attribute },
          url       : any      	= this.baseURI + "manage-data-chars.php";

          console.log(options);

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         this.hideForm   = true;
         this.sendNotification(`Congratulations the technology: ${name} was successfully added`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!');

         console.dir(error);
         console.dir(name);console.dir(quant);
      });
   }

   updateEntry(name : string, quant : number, star : number, attribute : number) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),          
          options   : any   = { "key" : "update", "name" : name, "quant" : quant, "star" : star, "attribute" : attribute, "recordID" : this.recordID},
          url       : any      	= this.baseURI + "manage-data-chars.php";

      this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data =>
      {
         // If the request was successful notify the user
         this.hideForm  =  true;
         this.sendNotification(`Congratulations the technology: ${name} was successfully updated`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!Update');
         console.log(error);
      });
   }

   deleteEntry() : void
   {
      let name          : string = this.form.controls["name"].value;

      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options   : any   = { "key" : "delete", "name" : name, "recordID" : this.recordID},
          url       : any   = this.baseURI + "manage-data-chars.php";

      this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data =>
      {
         this.hideForm     = true;
         this.sendNotification(`Congratulations the technology: ${name} was successfully deleted`);
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
      let name          : string = this.form.controls["name"].value;
      let quant         : number = this.form.controls["quant"].value;
      let star          : number = this.form.controls["stars"].value;
      let attribute     : number = this.form.controls["attribute"].value;

      if(this.isEdited)
      {
         this.updateEntry(name, quant, star, attribute);
      }
      else
      {      
         this.createEntry(name, quant, star, attribute);
      }
   }

   resetFields() : void
   {
      this.charName = "";      
   }

   sendNotification(message : string)  : void
   {
      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notification.present();
   }

  loadAttributes():void{
    this.http.get('http://localhost/bleach_brave_souls/retrieve-data-attribute.php').subscribe((data : any) =>
      {
         console.dir(data);
         this.attributes = data;
         console.log(this.nmAttribute);
      },
      (error : any) =>
      {
         console.dir(error);
      });  
  }

  loadStars():void{
    this.http.get('http://localhost/bleach_brave_souls/retrieve-data-star.php').subscribe((data : any) =>
      {
         console.dir(data);
         this.stars = data;         
      },
      (error : any) =>
      {
         console.dir(error);
      });  
  }

  public oldAttChoice = 1;
  changeAttribute(attribute){
    //console.log(attribute);
    let cd_attribute = parseInt(attribute);
    console.log(cd_attribute);
    /*console.log(this.attributes[cd_attribute-1].cd_attribute);
    console.log(this.attributes[cd_attribute-1].nm_attribute);*/

    document.getElementById("tdAtt"+this.oldAttChoice).style.backgroundColor = "white";
    document.getElementById("tdAtt"+cd_attribute).style.backgroundColor = "black";    
    this.oldAttChoice = cd_attribute;

    this.nmAttribute = this.attributes[cd_attribute-1].nm_attribute;
    this.cdAttribute = cd_attribute;
  }

  public oldStarChoice = "1";
  changeStar(cdStar){
    /*console.log(cdStar);
    console.log(this.oldStarChoice);*/
    document.getElementById(this.oldStarChoice).style.backgroundColor="white";
    document.getElementById(cdStar).style.backgroundColor="black";
    this.oldStarChoice = cdStar;

    //console.log(cdStar);
    //this.form.controls["stars"] = cdStar;
    //document.getElementById("cdStars").innerHTML = cdStar;
    this.cdStars = cdStar;
  }

}
