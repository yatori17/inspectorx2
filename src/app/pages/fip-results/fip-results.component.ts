import { Component, OnInit } from '@angular/core';
import { PartfipModel } from './../../core/models/partfip.model';
import { ArtefatoModel } from './../../core/models/artefato.model';
import { Subscription } from 'rxjs';
import { ApiService } from './../../core/api.service';
import { AuthService } from './../../auth/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DbhelpService } from './../../service/dbhelp.service';
import { RespfipModel } from './../../core/models/respfip.model';
import { SplitArtifactService } from '../../service/split-artifact.service';


@Component({
  selector: 'app-fip-results',
  templateUrl: './fip-results.component.html',
  styleUrls: ['./fip-results.component.scss'],
  providers: [DbhelpService, SplitArtifactService]
})
export class FipResultsComponent implements OnInit {
 	myBool: boolean;
  loading: boolean;
  error: boolean;

  PartfipList: PartfipModel[];

  defLine: Array<String>= [];

  booleanArray: Array<boolean>=[];
  description: Array<String> = [];
  taxonomy: Array<String> = [];
  ArtefatoIdSub: Subscription;
  ArtefatoIdList: ArtefatoModel[];
  ArtefatoIdModelo: ArtefatoModel;

  RespfipArray: Array<string> = [];
  ArtefatoArray: Array<ArtefatoModel> = [];

  partida: string;
  artefato: string;
  titleValue: string;
  contentValue: string;
  tempInicio: string;
  tempFinal: string;

  linearray: Array<boolean> = [];
  detDescriptArray: Array<string> = [];
  detTaxonomyArray: Array<string> = [];

  disableArray: Array<boolean> = [];


  selectedValue: any;
  selectedRespfip: any;
  selectedType: any;
  //new
  partidaid: string;
  inspetor: string;
  InspectorArray: Array<string> = [];
  RespfipArr: Array<any> = [];
  moderador: string;
  ModResp: any;
  xp: number = 0;

 constructor(private route: ActivatedRoute,
  private router: Router,
  private api: ApiService,
  public auth: AuthService,
  private sanitizer: DomSanitizer,
  private dbhelp: DbhelpService,
  public service: SplitArtifactService



   ) { }

  ngOnInit() {
   this.route.params.forEach(params => {
     this.partidaid = params['id'];

     this.dbhelp._getPartfipById(this.partidaid).then(res => {
       this.InspectorArray = res[0].inspetor;
       this.moderador = this.auth.userProfile.name;
        this.dbhelp._getRespfipBy_User_Partida(this.auth.userProfile.sub, this.partidaid).then(res =>{
          this.ModResp = res;
          for(let resps of res){
            if(resps.xp) this.xp+= resps.xp;
          }
        })

       for (let _i = 0; _i < this.InspectorArray.length; _i++) {
         console.log(this.InspectorArray)
         this.dbhelp._getRespfipBy_User_Partida(res[0].inspetor[_i], this.partidaid).then(res => {
         console.log(res);
         this.RespfipArr.push(res);
         });
       }



     })
    });



  }
  getArtifact(artefaoid){
    this.dbhelp._getArtefatoByUse(artefaoid).then(
      res =>{
        this.ArtefatoArray = res;
        this.defLine = this.service.splitartifact(res[0].content);
        this.booleanArray = this.ArtefatoArray[0].defectbool;
        this.taxonomy = this.ArtefatoArray[0].defecttaxonomy;
        this.description= this.ArtefatoArray[0].defectdescript;
        console.log(this.booleanArray)
      }
    )
  }
  private HTMLSanitizer(code: string) {
    return this.sanitizer.bypassSecurityTrustHtml(code);
  }


}
