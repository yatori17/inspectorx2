import { Component, OnInit } from '@angular/core';
import { PartfipModel } from './../../core/models/partfip.model';
import { RespfipModel } from './../../core/models/respfip.model';
import { ArtefatoModel } from './../../core/models/artefato.model';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../core/api.service';
import { AuthService } from './../../auth/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-fip-discrim',
  templateUrl: './fip-discrim.component.html',
  styleUrls: ['./fip-discrim.component.scss']
})
export class FipDiscrimComponent implements OnInit {
  	myBool: boolean;
  loading: boolean;
  error: boolean;

  PartfipSub: Subscription;
  PartfipList: PartfipModel[];
  PartfipModelo: PartfipModel;

  RespfipSub: Subscription;
  RespfipList: RespfipModel[];
  RespfipModelo: RespfipModel;

  ArtefatoIdSub: Subscription;
  ArtefatoIdList: ArtefatoModel[];
  ArtefatoIdModelo: ArtefatoModel;

  RespfipArray: Array<string> = [];
  ArtefatoArray: Array<string> = [];

  partida: string;
  artefato: string;
  titleValue: string;
  contentValue: string;
  tempInicio: string;
  tempFinal: string;
  defLine: Array<string>;
  linearray: Array<boolean> = [];
  detDescriptArray: Array<string> = [];
  detTaxonomyArray: Array<string> = [];
  pstringinicio: string = "<p>";
  pstringfinal: string = "</p>";
  disableArray: Array<boolean> = [];

  selectedValue: any;
  selectedRespfip: any;
  selectedType: any;


  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, public auth: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  	this._getDiscrimPartfip().then(PartfipList =>{
    console.log(this.PartfipList);      
    });
  }



  public artefatoarray(arr: any){
    	console.log("artefato array");
    	this.ArtefatoArray = arr;
  /*   this._getRespfip().then(Respfip2List =>{
    console.log(this.Respfip2List);      
    });*/
    	console.log(this.ArtefatoArray);
    }

      private HTMLSanitizer(code: string){
    return this.sanitizer.bypassSecurityTrustHtml(code);
  }
  

  public _getArtefatoByUse(id: string){

    console.log(id);
    return new Promise(resolve => {
    console.log("iniciou artefatobyid");
    this.loading = true;

    this.ArtefatoIdSub = this.api.getArtefatoById$(id).subscribe(
      res => {
        this.ArtefatoIdList= res;
   
        this.loading = false;
   
       console.log(this.ArtefatoIdList);
       
        this.splitsplit();
        
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
      )

  });
  }

 public splitsplit(){
    this.defLine = this.ArtefatoIdList[0].content.split("</p><p>");
     for (var _i = 0; _i < this.defLine.length; _i++){
       if (_i == 0) {
           this.defLine [_i] = this.defLine[_i].concat("</p>");
        } else
        if (_i == this.defLine.length - 1){
           this.defLine[this.defLine.length - 1] = this.pstringinicio.concat(this.defLine[this.defLine.length - 1]);
        } else {
          this.defLine[_i] = this.pstringinicio.concat(this.defLine[_i]);
          this.defLine [_i] = this.defLine[_i].concat("</p>");
        }
     } this.defLine
    console.log(this.defLine);
}


  public _getDiscrimRespfip(partida: string){
    return new Promise(resolve => {
    //console.log("iniciou partidalist");
    this.loading = true;

    this.RespfipSub = this.api.getDiscrimRespfipById$(partida).subscribe(
          res => 
        {
        this.RespfipList = res;
            this.loading = false;
            resolve(this.RespfipList);
            
          },
          err => {
            console.error(err);
            this.loading = false;
            this.error = true;
          }
          )
    });
  }

 	public _getDiscrimPartfip(){
    return new Promise(resolve => {
    console.log("iniciou partfip");
    this.loading = true;

    this.PartfipSub = this.api.getDiscrimPartfip$(this.auth.userProfile.sub).subscribe(
          res => 
        {
        this.PartfipList = res;
            this.loading = false;
            resolve(this.PartfipList)
            
          },
          err => {
            console.error(err);
            this.loading = false;
            this.error = true;
          }
          )
      });
    }

}
