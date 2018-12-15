import { Component, OnInit } from '@angular/core';
import { PartfipModel } from './../../core/models/partfip.model';
import { ArtefatoModel } from './../../core/models/artefato.model';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../core/api.service';
import { AuthService } from './../../auth/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DbhelpService } from './../../service/dbhelp.service';

@Component({
  selector: 'app-fip-results',
  templateUrl: './fip-results.component.html',
  styleUrls: ['./fip-results.component.scss'],
  providers: [DbhelpService]
})
export class FipResultsComponent implements OnInit {
 	myBool: boolean;
  loading: boolean;
  error: boolean;

  PartfipList: PartfipModel[];



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


 constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, public auth: AuthService, private sanitizer: DomSanitizer, private dbhelp: DbhelpService) { }

  ngOnInit() {
   this.route.params.forEach(params => {
     this.partidaid = params['id'];

     this.dbhelp._getPartfipById(this.partidaid).then(res => {
       this.InspectorArray = res[0].inspetor;

       for (let _i = 0; _i < this.InspectorArray.length; _i++) {

       this.dbhelp._getRespfipBy_User_Partida(res[0].inspetor[_i], this.partidaid).then(res => {
         console.log(res);
         this.RespfipArr.push(res);


/*          for(var _k = 0; _k < this.RespfipArr[_i].length; _k++){
        if (this.RespfipArr[_i][_k] ==
                }*/
       });




        }


       console.log('NAO SEI');
     });
     //   this._getRespfipById("google-oauth2|117874532201046827537", "5c11c234f6addf0ef8e149e8");

  	});
  }


}
