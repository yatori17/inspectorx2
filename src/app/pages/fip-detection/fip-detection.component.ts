import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { RespfipModel } from './../../core/models/respfip.model';
import { ArtefatoModel } from './../../core/models/artefato.model';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../core/api.service';
import { AuthService } from './../../auth/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
//Service
import { SplitArtifactService } from './../../service/split-artifact.service';
import { DbhelpService } from './../../service/dbhelp.service';

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


  types: Array<any>;



   constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, public auth: AuthService, private sanitizer: DomSanitizer, private service: SplitArtifactService, private dbhelp: DbhelpService) {}

  ngOnInit() {

    this.dbhelp._getArtefato().then(res => {
      this.ArtefatoList = res;
    })    

    this.dbhelp._getPartfip().then(res => {
      this.PartfipList = res;
    });


  }

  checkcheck() {
    this.disableArray = [];
    this.dbhelp._getRespfipBy_User_Partida(this.auth.userProfile.sub, this.selectedValue._id).then(res => {
      console.log('Passo 1');
      for (let _k = 0; _k <= this.ArtefatoArray.length; _k++) {
        console.log('Passo 2');
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
    	console.log('artefato array');
    	this.ArtefatoArray = arr;
    }

      public _modelchangeartefato(id: string) {
    console.log('zerar?');
    this.linearray = [];
    this.detDescriptArray = [];
    this.detTaxonomyArray = [];

    this.dbhelp._getArtefatoByUse(id).then(res => {
      console.log(res[0].content);
      this.ArtefatoIdList = res;
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

    for(var _i = 0; _i < this.defLine.length; _i++){
      if (this.linearray[_i] == false){
        this.detDescriptArray[_i] = null;
        this.detTaxonomyArray[_i] = null;
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
                                 this.ArtefatoIdList[0].title);


    this.router.navigate(['/', 'fullinspec']);

    }

}
