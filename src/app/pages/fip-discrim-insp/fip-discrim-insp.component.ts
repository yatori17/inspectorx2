import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DbhelpService } from '../../service/dbhelp.service';
import { ArtefatoModel } from './../../core/models/artefato.model';
import { RespfipModel } from './../../core/models/respfip.model';


import { SplitArtifactService } from '../../service/split-artifact.service';
import { PartfipModel } from '../../core/models/partfip.model';
import { DomSanitizer } from '@angular/platform-browser';
import { resolve } from 'url';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { timer, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-fip-discrim-insp',
  templateUrl: './fip-discrim-insp.component.html',
  styleUrls: ['./fip-discrim-insp.component.scss'],
  providers: [SplitArtifactService, DbhelpService]

})
export class FipDiscrimInspComponent implements OnInit {

  ArtifactModelList: ArtefatoModel[]=[];
  partidaFipList: PartfipModel[] = [];
  selectedValue: any;
  artifactArray: Array<any> = [];
  partida: string;
  disableArray: Array<any> =[];
  selectedArtifact: any;
  defLine: Array<string>;
  linearray: Array<boolean> = [];
  detDescriptArray: Array<string> = [];
  detTaxonomyArray: Array<string> = [];
  booleanArray: Array<boolean> = [];
  RespfipList: RespfipModel[]=[];
  resposta: boolean = false;
  user: string= '';
  RespfipArr: RespfipModel[]=[];
  ArtefatoArr: ArtefatoModel[]=[];
  xp: number =0;
  rate: number =0;
  artifacts="Artifacts disabled means that the moderator finished the discrimination stage"
  review="Reviews in progress";
  contentA="You can not change your answer";


  constructor(
    private auth: AuthService,
    private db: DbhelpService,
    private service: SplitArtifactService,
    private sanitizer: DomSanitizer,
    public modalService: NgbModal
  ) {
    this.user = this.auth.userProfile.sub;
  }



  ngOnInit() {
    this.db._getPartidaByInspector(this.auth.userProfile.sub).then(
      res => {
        this.partidaFipList = this.db.PartfipList;
      }
    );

  }

  public refresh(){
    if(this.selectedValue){
      this.getAnswers();
      this.selectedArtifact = null;
    }
  }



  public checkChanges(){
    if(this.selectedValue != null){
      this.getAnswers();
    }
  }

  open(content) {
    this.modalService.open(content);
  }
  public artifactCheck(){
    if(this.disableArray.length != this.artifactArray.length) return false;
    if(this.disableArray.length > 0){
      for(const artifacts of this.disableArray){
       if(artifacts == false){
          return false;
        }
      }
      return true;
  }else return false;
  }

  setArtifactArray(arr: any){
    this.artifactArray = arr;
    this.partida = this.selectedValue.title;
    this.selectedArtifact = null;
  }
  getAnswers(){
    this.disableArray = [];
     this.db._getRespfipBy_User_Partida(this.selectedValue.userId, this.selectedValue._id).then(res => {
      for (let _k = 0; _k < this.artifactArray.length; _k++) {
        for (let _i = 0; _i < res.length; _i++) {

          if (this.artifactArray[_k] == res[_i].artefatoId) {
             this.disableArray[_k] = true;
             break;
          } else {
              this.disableArray[_k] = false;
            }
    }
  }
  });

}
getScore(){
  this.xp = 0; this.rate = 0;
  this.db._getRespfipBy_User_Partida(this.auth.userProfile.sub, this.selectedValue._id).then(
    res=>{
      console.log(res)
      this.RespfipArr = res;
      for(let respostas of this.RespfipArr){
        if(respostas.xp) this.xp+= respostas.xp;
      }
    }
  )
}

public _modelchangeartefato(id: string) {
  this.linearray = [];
  this.detDescriptArray = [];
  this.detTaxonomyArray = [];
  this.booleanArray = [];
  this.db._getArtefatoByUse(id).then(res => {
    this.defLine = this.service.splitartifact(res[0].content);
    });

  this.db._getRespfipBy_Partida_Artefato(this.selectedValue._id, id, true).then(res=>{
    this.RespfipList = res;
    if(res.length > 0){
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
  }
  });
}
private HTMLSanitizer(code: string) {
  return this.sanitizer.bypassSecurityTrustHtml(code);
}


}
