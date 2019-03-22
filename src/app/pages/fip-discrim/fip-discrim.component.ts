import { Component, OnInit } from '@angular/core';
import { PartfipModel } from './../../core/models/partfip.model';
import { ArtefatoModel } from './../../core/models/artefato.model';
import { RespfipModel } from './../../core/models/respfip.model';

import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../../auth/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//Service
import { SplitArtifactService } from './../../service/split-artifact.service';
import { DbhelpService } from './../../service/dbhelp.service';

@Component({
  selector: 'app-fip-discrim',
  templateUrl: './fip-discrim.component.html',
  styleUrls: ['./fip-discrim.component.scss'],
  providers: [SplitArtifactService, DbhelpService]
})
export class FipDiscrimComponent implements OnInit {
  	myBool: boolean;
  loading: boolean;
  error: boolean;


  PartfipList: any;

  ArtefatoIdList: ArtefatoModel[];
  ArtefatoIdModelo: ArtefatoModel;

  RespfipList: RespfipModel[];

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

  disableArray: Array<boolean> = [];

  booleanArray: Array<boolean> = [];

  selectedValue: any;
  selectedRespfip: any;
  selectedType: any;
  selectedArtifact: any;

  avisoFaltouResposta: boolean = false;

    types: Array<any>;


  constructor(private router: Router, public auth: AuthService, private sanitizer: DomSanitizer, private service: SplitArtifactService, private dbhelp: DbhelpService) { }

  ngOnInit() {


  	this.dbhelp._getPartfipBy_User(this.auth.userProfile.sub).then(res => {
        console.log(this.PartfipList);
        this.PartfipList = res;
    });
  }

  public results() {

    // criar resultado final
    // Pego o primeiro respfip da lista e pego o artefato correspondente com artefatoid
    // comparar ambos. defectbool e defecttaxonomy pra cada linha.

    this.router.navigate(['/', 'fipresults', this.selectedValue._id]);
  }

  public buttonCriarResposta(){
    this.avisoFaltouResposta = false;

    for (var q = 0; q<this.linearray.length; q++){
     if (this.linearray[q] == true && this.detTaxonomyArray[q] == null){
      this.avisoFaltouResposta = true;
      console.log("Faltou resposta")
     } 
   }

     if (this.avisoFaltouResposta == false){
    this.dbhelp._createRespfip(this.auth.userProfile.sub,
                                 this.selectedValue._id,
                                 this.selectedArtifact,
                                 'teste',
                                 this.linearray,
                                 this.detDescriptArray,
                                 this.detTaxonomyArray,
                                 false,
                                 'teste');
    }
    
    this.router.navigate(['/', 'fullinspec']);
    
  }
  

  public artefatoarray(arr: any) {
    	console.log('artefato array');
    	this.ArtefatoArray = arr;
  /*   this._getRespfip().then(Respfip2List =>{
    console.log(this.Respfip2List);
    });*/
    	console.log(this.ArtefatoArray);
    }

      private HTMLSanitizer(code: string) {
    return this.sanitizer.bypassSecurityTrustHtml(code);
  }

  public changeRadio(taxonomy: string, position: number){
    console.log(taxonomy);
    this.detTaxonomyArray[position] = taxonomy;
    console.log(this.detTaxonomyArray);

  }

  public _modelchangeartefato(id: string) {
    console.log('zerar?');
    this.linearray = [];
    this.detDescriptArray = [];
    this.detTaxonomyArray = [];
    this.booleanArray = [];
    this.dbhelp._getArtefatoByUse(id).then(res => {
      console.log(res[0].content);
      this.defLine = this.service.splitartifact(res[0].content);
      });

    this.dbhelp._getRespfipBy_Partida_Artefato(this.selectedValue._id, id, true).then(res=>{
      this.RespfipList = res;

      for (var j=0; j<res[0].detbool.length; j++){
        this.booleanArray.push(false);
        this.detTaxonomyArray.push(null);
        this.linearray.push(false);
      }

      for (var k=0; k<res.length; k++){
        for (var i=0; i<res[0].detbool.length; i++){
          this.booleanArray[i] = this.booleanArray[i] || res[k].detbool[i];
        }
      }
    });



  }

    checkcheck() {
    this.disableArray = [];
    this.dbhelp._getRespfipBy_User_Partida(this.auth.userProfile.sub, this.selectedValue._id).then(res => {
      console.log('Passo 1');
      
      for (let _k = 0; _k <= this.ArtefatoArray.length; _k++) {
        console.log('Passo 2 ' + _k);
        console.log(res);
        console.log(res.length);
        for (let _i = 0; _i < res.length; _i++) {
          
          if (this.ArtefatoArray[_k] == res[_i].artefatoId) {
             this.disableArray[_k] = true;
             console.log('trueeee');
             break;
          } else {
              this.disableArray[_k] = false;
              console.log('falseeee');
            }
      }
    }
    });
  }
  

}
