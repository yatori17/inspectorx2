import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { RespfipModel } from './../../core/models/respfip.model';
import { ArtefatoModel } from './../../core/models/artefato.model';
import { Subscription, config } from 'rxjs';
import { ApiService } from './../../core/api.service';
import { AuthService } from './../../auth/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
//Service
import { SplitArtifactService } from './../../service/split-artifact.service';
import { DbhelpService } from './../../service/dbhelp.service';
import { NgbPopoverConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { resolve } from 'url';
import { ListuserModel } from './../../core/models/listuser.model';


@Component({
  selector: 'app-fip-detection',
  templateUrl: './fip-detection.component.html',
  styleUrls: ['./fip-detection.component.scss'],
  providers: [SplitArtifactService, DbhelpService]
})
export class FipDetectionComponent implements OnInit {
	myBool: boolean;
  loading: boolean;
  error: boolean;

  ArtefatoList: any;
  TaxonomiaList: any;

  ArtefatoIdSub: Subscription;
  ArtefatoIdList: ArtefatoModel[];
  ArtefatoIdModelo: ArtefatoModel;

  PartfipList: any;



  RespfipList: RespfipModel[];


  xp: number=0;
  Respfip2List: any;

  ArtefatoArray: any[] = [];
  selectedValue: any;
  selectedArtifact: any;
  selectedType: any;

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
  description: String = '';
  User: ListuserModel;

  artifacts="Artifacts choosen by the Moderator for this review"
  reviews="Reviews available";
  content="You must inspect the software artifact aiming identify defects or anomalies.";


  types: Array<any>;



   constructor(private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    public auth: AuthService,
    config: NgbPopoverConfig,
    private sanitizer: DomSanitizer,
    private service: SplitArtifactService,
    private dbhelp: DbhelpService,
    private modalService: NgbModal) {
    config.placement = 'left';
    config.triggers = 'hover';
   }

  ngOnInit() {

    this.dbhelp._getArtefato().then(res => {
      this.ArtefatoList = res;
    })

    this.dbhelp._getPartidaByInspector(this.auth.userProfile.sub).then(
      res => {
        this.PartfipList = this.dbhelp.PartfipList;
      }
    )
    this.dbhelp._getUserById(this.auth.userProfile.sub).then(
      res => {
        this.User = this.dbhelp.ListuserModelo;
      }
    )


  }
  public refreshreview(){
    this.dbhelp._getPartidaByInspector(this.auth.userProfile.sub).then(
      res =>{
        this.PartfipList = this.dbhelp.PartfipList;
      }
    )
  }

  open(content) {
    this.modalService.open(content);
  }
  public artifactCheck(){
    if(this.disableArray.length != this.ArtefatoArray.length) return false;
    if(this.disableArray.length > 0){
      for(const artifacts of this.disableArray){
       if(artifacts == false){
          return false;
        }
      }
      return true;
  }else return false;
  }


  checkcheck() {
    this.selectedArtifact = null;
    this.disableArray = [];
    this.dbhelp._getRespfipBy_User_Partida(this.auth.userProfile.sub, this.selectedValue._id).then(res => {
      for (let _k = 0; _k < this.ArtefatoArray.length; _k++) {
           for (let _i = 0; _i < res.length; _i++) {
             console.log("TO AQUI ESSAS")
          if (this.ArtefatoArray[_k] == res[_i].artefatoId) {
             this.disableArray[_k] = true;
             break;
          } else {
              this.disableArray[_k] = false;
              console.log('falseeee');
            }
      }
    }
    });
  }
  public lookfor(element: string){
    if(!element){
      this.description='';
      return;
    }
    const result = this.types.find( type => type.display === element).description;
    if(!result){
      this.description = '';
    }else this.description = result;
  }

  public checkArtefatoRespondido(artif: string) {
      for (let _i = 0; _i < this.Respfip2List.length; _i++) {
        if (artif == this.Respfip2List[_i].artefatoId) {
          return true;
        } else {
        return false;
        }
      }
  }

  private HTMLSanitizer(code: string) {
    return this.sanitizer.bypassSecurityTrustHtml(code);
  }

    public artefatoarray(arr: any) {
    	this.ArtefatoArray = arr;
    }

      public _modelchangeartefato(id: string) {
    this.linearray = [];
    this.detDescriptArray = [];
    this.detTaxonomyArray = [];

    this.dbhelp._getArtefatoByUse(id).then(res => {
      this.ArtefatoIdList = res;
      console.log(this.ArtefatoIdList);
      this.defLine = this.service.splitartifact(res[0].content);


     for(var _i = 0; _i < this.defLine.length; _i++){
      this.linearray.push(false);
      this.detDescriptArray.push(null);
      this.detTaxonomyArray.push(null);
    }

      this.dbhelp._getTaxonomiaById(this.ArtefatoIdList[0].taxid).then(res =>{
        this.types = res[0].value;
      });
      })

  }


    public executarResp() {
      this.xp = 0;
    for(var _i = 0; _i < this.defLine.length; _i++){
      if (this.linearray[_i] == false){
        this.detDescriptArray[_i] = null;
        this.detTaxonomyArray[_i] = null;
      }else{
        if(this.ArtefatoIdList.length > 0){
          if(this.ArtefatoIdList[0].defecttaxonomy[_i] === this.detTaxonomyArray[_i]){
            this.User.xp += 5;
            this.xp+= 5;
          }
        }
      }
    }
      this.dbhelp._createRespfip(this.auth.userProfile.sub,
                                 this.selectedValue._id,
                                 this.selectedArtifact,
                                 'teste',
                                 this.linearray,
                                 this.detDescriptArray,
                                 this.detTaxonomyArray,
                                 true,
                                 this.ArtefatoIdList[0].title,
                                 this.xp);
      var index =this.ArtefatoArray.findIndex( element => element == this.selectedArtifact);
      this.dbhelp._editUserById(this.User._id,this.User);
      if(index >=0){
        this.disableArray[index] = true;
        this.selectedArtifact = null;
      }
    }
    public nextStage(){
      this.router.navigate(['/fipdiscriminsp']);
    }

}
