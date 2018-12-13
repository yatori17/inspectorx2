import { Component, OnInit } from '@angular/core';
import { ListuserModel } from './../../core/models/listuser.model';
import { ArtefatoModel } from './../../core/models/artefato.model';
import { PartfipModel } from './../../core/models/partfip.model';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../core/api.service';
import { AuthService } from './../../auth/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-fip-create',
  templateUrl: './fip-create.component.html',
  styleUrls: ['./fip-create.component.scss']
})
export class FipCreateComponent implements OnInit {
difValue: number;
myBool: boolean;
  loading: boolean;
  error: boolean;
  partidanome: string = null;
  ListuserSub: Subscription;
  ListuserList: ListuserModel[];
  ListuserModelo: ListuserModel;
  ListuserArrCheck: Array<string> = [];
  ArtefatoSub: Subscription;
  ArtefatoList: ArtefatoModel[];
  ArtefatoModelo: ArtefatoModel;
  ArtefatoArrCheck: Array<string> = [];
  PartfipSub: Subscription;
  PartfipList: PartfipModel[];
  PartfipModelo: PartfipModel;

  InspecListFail: boolean;
  ArtifListFail: boolean;

   constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, public auth: AuthService) { }

  ngOnInit() {
    this._getListuser().then(ListuserList => {
    console.log(this.ListuserList);
    });
    this._getArtefato().then(ArtefatoList => {
    console.log(this.ArtefatoList);
    });

  }

  	clickAtivo(value: number) {
  		this.difValue = value;
  		console.log('clickAtivo: ' + this.difValue);
  	}

  /*calculateClasses(option: number){
    	console.log("calculateclasses: " + option)
    	if (option == this.difValue){
    		this.myBool = true;
    	}
    	else { this.myBool = false; }

  	return
  			style;
  	}*/

    private _getListuser() {
        return new Promise(resolve => {
        //console.log("iniciou partidalist");
        this.loading = true;

        this.ListuserSub = this.api.getUsuarioOnline$().subscribe(
          res => {
        this.ListuserList = res;
            this.loading = false;
            resolve(this.ListuserList);

          },
          err => {
            console.error(err);
            this.loading = false;
            this.error = true;
          }
          );
      });
    }


    private _getArtefato() {
        return new Promise(resolve => {
        //console.log("iniciou partidalist");
        this.loading = true;

        this.ArtefatoSub = this.api.getArtefato$().subscribe(
          res => {
        this.ArtefatoList = res;
            this.loading = false;
            resolve(this.ArtefatoList);

          },
          err => {
            console.error(err);
            this.loading = false;
            this.error = true;
          }
          );
      });
    }

    private _createListuserArray() {
      
       	for (const listuser of this.ListuserList) {
      		if (listuser.isActive == true) {
    	  		console.log(listuser.userId);
    		  	this.ListuserArrCheck.push(listuser.userId);

    		  }
    	  }
        console.log("ListArrCheck resultado");
        console.log(this.ListuserArrCheck);
        if (typeof this.ListuserArrCheck !== 'undefined' && this.ListuserArrCheck.length > 0) {
          console.log("ListuserArray TA CHEIO");
          return true;
        } else {
          console.log ("ListuserArray TA VAZIO!!");

          return false;
          }
    }


    private _createArtefatoArray() {
    	for (const artefato of this.ArtefatoList) {
    		if (artefato.isActive == true) {
    			console.log(artefato._id);
    			this.ArtefatoArrCheck.push(artefato._id);
    		}
    	}
       if (typeof this.ArtefatoArrCheck !== 'undefined' && this.ArtefatoArrCheck.length > 0) {
          console.log("ArtefatoArray TA CHEIO");
          return true;
        } else {
          console.log ("Artefato Array TA VAZIO!!");

          return false;
          }
    }

    public buttonclick() {
     if (this._createListuserArray()) {
       this.InspecListFail = false;
      } else {
        this.InspecListFail = true;
      }  

      if (this._createArtefatoArray()) {
        this.ArtifListFail = false;
      } else {
        this.ArtifListFail = true;
      }

      if (this.ArtifListFail == false && this.InspecListFail == false){
        this._createPartfip();
        this.router.navigate(['/', 'fullinspec']);
      }
    }

    public _createPartfip() {
    //const respostaAtual = new Resposta(      );


      return new Promise(resolve => {

   const partfipModelo = new PartfipModel(
        this.auth.userProfile.sub,
        this.partidanome,
        this.difValue,
        this.ArtefatoArrCheck,
        this.ListuserArrCheck
    );

      //this.partidaModelo = new PartidaModel();
      console.log('game component: ');
      console.log(partfipModelo);


    this.PartfipSub = this.api
      .postPartfip$(partfipModelo)
      .subscribe(
        res => {

          console.log('resultado partfip');

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
