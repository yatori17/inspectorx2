import { Component, OnInit } from '@angular/core';
import { DbhelpService } from '../../../service/dbhelp.service';
import {AuthService} from '../../../auth/auth.service';
import { PartfipModel } from '../../../core/models/partfip.model';
import { RespfipModel } from '../../../core/models/respfip.model';
import {ArtefatoModel} from '../../../core/models/artefato.model';
import { SplitArtifactService } from '../../../service/split-artifact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';


interface Partidas {
  id?: string;
  name: string;
  hithate: number;
  xp: number;
  extraxp : number;
}

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss'],
  providers: [SplitArtifactService, DbhelpService]
})

export class HistoricComponent implements OnInit {


  constructor(
    private auth: AuthService,
    private db: DbhelpService,
    public service: SplitArtifactService,
    public modalService: NgbModal,
    private sanitizer: DomSanitizer

    ) { }
    PartidaList :PartfipModel[]=[];
    respFip: RespfipModel[]=[];
    ArtefatoArray: ArtefatoModel[]=[];
    defLine: Array<String> =[];
    booleanArray: Array<Boolean> = [];
    correctAnswers: Array<Boolean> = [];
    defect: Array<String> = [];
    tax: Array<String> =[];
    answer: Array<String> =[];
    description: boolean = false;
    descriptionUser: boolean = false;
    historico: Array<Partidas>=[];
    xp: number;
    artifactName:String="";



  ngOnInit() {
    this.db._getPartfipBy_User(this.auth.userProfile.sub).then(res =>{
      this.PartidaList = this.db.PartfipList;
      this.db._getPartidaByInspector(this.auth.userProfile.sub).then( res =>{
        for(let parts  of this.db.PartfipList){
            this.PartidaList.push(parts);
        }
        for(let parts of this.PartidaList){
          this.db._getRespfipBy_User_Partida(this.auth.userProfile.sub, parts._id).then(
            res=>{
              if(this.db.RespfipList.length){

               this.historico.push({
                id: parts._id,
                name: parts.title,
                hithate: 0,
                xp: 0,
                extraxp:0
              })
            }

              for( let resps of this.db.RespfipList){
                if(resps){
                  this.respFip.push(resps);
                  if(resps.xp > 0){
                    if(this.historico[this.historico.length-1]){
                      this.historico[this.historico.length-1].hithate+=1;
                      this.historico[this.historico.length-1].xp+=resps.xp;
                    }
                  }
                }
              }
            }
          )
        }
      })
    })
  }

  selectPartida(value){
    console.log(value)
    const Partida =this.PartidaList.find(partida => partida._id === value )
    return Partida;
  }
  result(selectedValue){
    const Partida= this.selectPartida(selectedValue);
    for(let artefatos of Partida.artefato){
      this.db._getArtefatoByUse(artefatos).then(res =>{
        for(let artifacts of this.db.ArtefatoList){
          this.ArtefatoArray.push(artifacts);
        }
      })
    }
  }

  getResp(id){
    return this.respFip.find(resps => resps.artefatoId ===id);
  }

  getArtifact(artifactSelected){
      const Artifact = artifactSelected;
      const Resp = this.getResp(Artifact._id);
      this.defLine = this.service.splitartifact(Artifact.content);
      this.booleanArray = Resp.detbool;
      this.defect = Resp.dettaxonomy;
      this.correctAnswers =  Artifact.defectbool;
      this.answer = Artifact.defectdescript;
      this.tax = Artifact.defecttaxonomy;
      this.artifactName = Resp.artefatotitle;
      this.xp= Resp.xp;
  }

  open(content){
    this.modalService.open(content);
  }

  private HTMLSanitizer(code: string) {
    return this.sanitizer.bypassSecurityTrustHtml(code);
  }
  pop(){
    while(this.defLine.length > 0) this.defLine.pop();
    while(this.ArtefatoArray.length>0) this.ArtefatoArray.pop();
    while(this.booleanArray.length>0) this.booleanArray.pop();
    while(this.defect.length>0) this.defect.pop();
    while(this.correctAnswers.length>0) this.correctAnswers.pop();
    while(this.tax.length >0 ) this.tax.pop();
    while(this.answer.length > 0) this.answer.pop();
      this.artifactName =""
      this.xp= 0;
  }

  Update(){
    this.description = !this.description;
  }




}
