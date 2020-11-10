import { Component, OnInit } from '@angular/core';
import { ArtefatoModel } from './../../core/models/artefato.model';
import { RespfipModel } from './../../core/models/respfip.model';

import { AuthService } from './../../auth/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//Service
import { SplitArtifactService } from './../../service/split-artifact.service';
import { DbhelpService } from './../../service/dbhelp.service';
import { ListuserModel } from './../../core/models/listuser.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  RespfipList: RespfipModel[] = [];

  RespfipArray: Array<string> = [];
  ArtefatoArray: Array<string> = [];
  ArtifactArray: ArtefatoModel[]=[];

  partida: string;
  artefato: string;
  titleValue: string;
  contentValue: string;
  tempInicio: string;
  tempFinal: string;
  defLine: Array<string>;
  user: ListuserModel;
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
  artifacts="Artifacts disabled means that the artifact was inspected"
  review="Reviews in progress";
  content="You must inspect the software artifact and select the real defects and discard the false positives";

    types: Array<any>;


  constructor(private router: Router,
    public auth: AuthService,
    private sanitizer: DomSanitizer,
    private service: SplitArtifactService,
    private dbhelp: DbhelpService,
    public modalService: NgbModal
    ) { }

  ngOnInit() {


    this.dbhelp._getUserById(this.auth.userProfile.sub).then(
      res => {
        this.user = this.dbhelp.ListuserModelo;
      }
    )
  	this.dbhelp._getPartfipBy_User(this.auth.userProfile.sub).then(res => {
        this.PartfipList = res;
    });
  }
  open(content) {
    this.modalService.open(content);
  }

  public results() {

    // criar resultado final
    // Pego o primeiro respfip da lista e pego o artefato correspondente com artefatoid
    // comparar ambos. defectbool e defecttaxonomy pra cada linha.

    this.router.navigate(['/', 'fipresults', this.selectedValue._id]);
  }
  public refresh(){
    if(this.selectedArtifact){
      this._modelchangeartefato(this.selectedArtifact);
    }
  }

  public buttonCriarResposta(){
    var xp =0;
    this.avisoFaltouResposta = false;
    console.log(this.linearray);
    for (var q = 0; q<this.linearray.length; q++){
     if (this.linearray[q] == true && this.detTaxonomyArray[q] == null){
      this.avisoFaltouResposta = true;
     }

     if(this.linearray[q] && this.detTaxonomyArray[q] === this.ArtifactArray[0].defecttaxonomy[q]){
       xp += 5;
       this.user.xp+=5;
       console.log("VAMOS LA")
     }
   }
   this.dbhelp._editUserById(this.user._id, this.user);

     if (this.avisoFaltouResposta == false){
    this.dbhelp._createRespfip(this.auth.userProfile.sub,
                                 this.selectedValue._id,
                                 this.selectedArtifact,
                                 'teste',
                                 this.linearray,
                                 this.detDescriptArray,
                                 this.detTaxonomyArray,
                                 false,
                                 'teste',
                                 xp);

    var index = this.ArtefatoArray.findIndex( element => this.selectedArtifact == element);
    if(index >= 0){
      this.disableArray[index] = true;
      this.selectedArtifact = null;
    }
    }


  }
  async change(){
    this.partida = this.selectedValue.title;
  }


  public artefatoarray(arr: any) {
      this.ArtefatoArray = arr;
      this.selectedArtifact = null;
  /*   this._getRespfip().then(Respfip2List =>{
    console.log(this.Respfip2List);
    });*/
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
    this.linearray = [];
    this.detDescriptArray = [];
    this.detTaxonomyArray = [];
    this.booleanArray = [];
    this.dbhelp._getArtefatoByUse(id).then(res => {
      this.defLine = this.service.splitartifact(res[0].content);
      this.ArtifactArray = res;
      console.log(this.ArtifactArray);
      });

    this.dbhelp._getRespfipBy_Partida_Artefato(this.selectedValue._id, id, true).then(res=>{
      this.RespfipList = res;
      if(res.length >0 ){
      for (var j=0; j<res[0].detbool.length; j++){
        this.booleanArray.push(false);
        this.detTaxonomyArray.push(null);
        this.linearray.push(false);
      }

      for (var k=0; k<res.length; k++){
        for (var i=0; i<res[0].detbool.length; i++){
          this.booleanArray[i] = this.booleanArray[i] || res[k].detbool[i];
        }

      }}
    });
  }

    checkcheck() {
      this.change();
    this.disableArray = [];
    this.dbhelp._getRespfipBy_User_Partida(this.auth.userProfile.sub, this.selectedValue._id).then(res => {

      for (let _k = 0; _k < this.ArtefatoArray.length; _k++) {
        for (let _i = 0; _i < res.length; _i++) {

          if (this.ArtefatoArray[_k] == res[_i].artefatoId) {
             this.disableArray[_k] = true;
             break;
          } else {
              this.disableArray[_k] = false;
            }
      }
    }
    });
  }


  public nextStage(){
    this.router.navigate(['/', 'fipresults', this.selectedValue._id]);
  }

  public artifactCheck(){
    if(this.disableArray.length != this.ArtefatoArray.length) return false;
    if(this.disableArray.length > 0){
      for(let artifacts of this.disableArray){
       if(artifacts==false){
          return false;
        }
      }
      return true;
  } else return false;
  }


}
