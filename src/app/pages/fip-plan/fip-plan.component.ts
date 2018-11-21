import { Component, OnInit } from '@angular/core';
import { ListuserModel } from './../../core/models/listuser.model';
import { PartfipModel } from './../../core/models/partfip.model';
import { ArtefatoModel } from './../../core/models/artefato.model';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../core/api.service';
import { AuthService } from './../../auth/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-fip-plan',
  templateUrl: './fip-plan.component.html',
  styleUrls: ['./fip-plan.component.scss']
})
export class FipPlanComponent implements OnInit {
	difValue: number;
	myBool: boolean;
  loading: boolean;
  error: boolean;
  ListuserSub: Subscription;
  ListuserList: ListuserModel[];
  ListuserModelo: ListuserModel;
  ArtefatoSub: Subscription;
  ArtefatoList: ArtefatoModel[];
  ArtefatoModelo: ArtefatoModel;

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
    });

    this._getPartfip().then(PartfipList =>{
    console.log(this.PartfipList);      
    });
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

    private _getPartfip(){
    return new Promise(resolve => {
    //console.log("iniciou partidalist");
    this.loading = true;

    this.PartfipSub = this.api.getPartfip$().subscribe(
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


}
