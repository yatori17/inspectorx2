import { Component, OnInit } from '@angular/core';
import { PartfipModel } from './../../core/models/partfip.model';
import { RespfipModel } from './../../core/models/respfip.model';
import { ArtefatoModel } from './../../core/models/artefato.model';
import { ConferefipModel } from './../../core/models/conferefip.model';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../core/api.service';
import { AuthService } from './../../auth/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-fip-results',
  templateUrl: './fip-results.component.html',
  styleUrls: ['./fip-results.component.scss']
})
export class FipResultsComponent implements OnInit {
 	myBool: boolean;
  loading: boolean;
  error: boolean;

  PartfipSub: Subscription;
  PartfipList: PartfipModel[];
  PartfipModelo: PartfipModel;

  RespfipSub: Subscription;
  RespfipList: RespfipModel[];
  RespfipModelo: RespfipModel;

  Respfip2Sub: Subscription;
  Respfip2List: RespfipModel[];
  Respfip2Modelo: RespfipModel;

  ArtefatoIdSub: Subscription;
  ArtefatoIdList: ArtefatoModel[];
  ArtefatoIdModelo: ArtefatoModel;

  ConferefipSub: Subscription;
  ConferefipList: ConferefipModel[];
  ConferefipModelo: ConferefipModel;

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
  //new
  partidaid: string;
  inspetor: string;
  InspectorArray: Array<string> = [];
  RespfipArr: Array<RespfipModel[]> = [];


 constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, public auth: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
   this.route.params.forEach(params => {
     this.partidaid = params["id"];

     this._getPartfipById(this.partidaid).then(PartfipList =>{
       this.InspectorArray = PartfipList[0].inspetor;
       
       for (var _i = 0; _i < this.InspectorArray.length; _i++){

       this._getRespfipById(this.InspectorArray[_i], this.partidaid).then(Respfip2List => {
         this.RespfipArr.push(Respfip2List);
         
       })
        }


       console.log("NAO SEI");
     });
     //   this._getRespfipById("google-oauth2|117874532201046827537", "5c11c234f6addf0ef8e149e8"); 

  	})
  }

    public artefatonamer(artefato: string){
        this._getArtefatoByUse(artefato).then(ArtefatoIdList => {

     })
        return "alo alo";
    }


    private _getPartfipById(partida: string){
    return new Promise(resolve => {
    console.log("iniciou partfipbyid");
    this.loading = true;

    this.PartfipSub = this.api.getPartfipById$(partida).subscribe(
          res => 
        {
        this.PartfipList = res;
            this.loading = false;
            console.log("vai pro resolve partfipbyid");
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

  public _getRespfipById(user: string, partida: string){
    return new Promise(resolve => {
    console.log("iniciou respfip by id");
    this.loading = true;

    this.Respfip2Sub = this.api.getRespfipById$(user, partida).subscribe(
          res => 
        {
        this.Respfip2List = res;
            this.loading = false;
            console.log("vai pro resolve respfipbyid");
            resolve(this.Respfip2List);
            
          },
          err => {
            console.error(err);
            this.loading = false;
            this.error = true;
          }
          )
      });
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
       
       // this.splitsplit();
        
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

    private _createConferefip(){
    //const respostaAtual = new Resposta(      );
      return new Promise(resolve => {
     
   const conferefipModelo = new ConferefipModel(
        this.auth.userProfile.sub,
        this.selectedValue._id,
        this.selectedRespfip.artefatoId,
        this.selectedRespfip._id,
        "teste",
        this.linearray,
        this.detDescriptArray,
        this.detTaxonomyArray
    );

    this.ConferefipSub = this.api
      .postConferefip$(conferefipModelo)
      .subscribe(
        res => {
  
          console.log("resultado conferefip");      
     
         // console.log(res._id);
         // this.temppartid = res._id;
         //      resolve(this.temppartid);
         

        },
        err => {
          console.log(err);
          }
        );
  });
}


}
