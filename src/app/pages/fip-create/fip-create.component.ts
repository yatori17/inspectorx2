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

   constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, public auth: AuthService){ }

  ngOnInit() {
    this._getListuser().then(ListuserList =>{
    console.log(this.ListuserList);      
    })
    this._getArtefato().then(ArtefatoList =>{
    console.log(this.ArtefatoList);      
    })
  
  }

  	clickAtivo(value: number){
  		this.difValue = value;
  		console.log("clickAtivo: "+ this.difValue);
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

    private _getListuser(){
        return new Promise(resolve => {
        //console.log("iniciou partidalist");
        this.loading = true;

        this.ListuserSub = this.api.getUsuarioOnline$().subscribe(
          res => 
        {
        this.ListuserList = res;
            this.loading = false;
            resolve(this.ListuserList)
            
          },
          err => {
            console.error(err);
            this.loading = false;
            this.error = true;
          }
          )
      });
    }


    private _getArtefato(){
        return new Promise(resolve => {
        //console.log("iniciou partidalist");
        this.loading = true;

        this.ArtefatoSub = this.api.getArtefato$().subscribe(
          res => 
        {
        this.ArtefatoList = res;
            this.loading = false;
            resolve(this.ArtefatoList)
            
          },
          err => {
            console.error(err);
            this.loading = false;
            this.error = true;
          }
          )
      });
    }

    private _createListuserArray(){
    	for (let listuser of this.ListuserList){
    		if (listuser.isActive == true){
    			console.log(listuser._id);
    			this.ListuserArrCheck.push(listuser._id);
    		}
    	}
    }


    private _createArtefatoArray(){
    	for (let artefato of this.ArtefatoList){
    		if (artefato.isActive == true){
    			console.log(artefato._id);
    			this.ArtefatoArrCheck.push(artefato._id);
    		}
    	}
    }

    public _createPartfip(){
    //const respostaAtual = new Resposta(      );

    this._createListuserArray();
    this._createArtefatoArray();


    console.log(this.ArtefatoArrCheck);
      return new Promise(resolve => {
     
   const partfipModelo = new PartfipModel(
        this.auth.userProfile.sub,
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
  
          console.log("resultado partfip");      
     
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
