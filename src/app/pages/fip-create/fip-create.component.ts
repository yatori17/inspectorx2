import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTooltipModule} from '@angular/material';
//RXJS
import { Subscription } from 'rxjs';
//Services
import { AuthService } from './../../auth/auth.service';
import { DbhelpService } from './../../service/dbhelp.service';
import { ArtefatoModel } from '../../core/models/artefato.model';
import {ListuserModel} from '../../core/models/listuser.model';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-fip-create',
  templateUrl: './fip-create.component.html',
  styleUrls: ['./fip-create.component.scss'],
  providers: [DbhelpService]
})

export class FipCreateComponent implements OnInit {
  changeText: boolean;
  position: string= "before";
  difValue: number = 0;
  onMouse: boolean = false;
  aux: boolean =false;
  on: number= -1;
  partidanome: string = null;
  ListuserList: any;
  userList: Array<ListuserModel>;
  ArtefatoList: any;
  ListuserArrCheck: Array<string> = [];
  ArtefatoArrCheck: Array<string> = [];
  InspecListFail: boolean;
  showArtefato: Array<boolean>=[];
  ArtifListFail: boolean;

constructor(private router: Router, public auth: AuthService, private dbhelp: DbhelpService,
  config: NgbPopoverConfig) {
    this.changeText=false;
    config.placement = 'right';
    config.triggers = 'hover'; }

  ngOnInit() {
    this.dbhelp._getListuser().then(res =>{
      this.ListuserList = res;
    })

    this.dbhelp._getArtefato().then(res => {
      this.ArtefatoList = res;
    })
  }
  onClick(){
    this.ArtefatoList[1].content;
  }


  clickAtivo(value: number) {
    //Isso vai modificar a dificuldade em algum momento
  	this.difValue = value;
    for (const artefato of this.ArtefatoList){
      artefato.isActive = false;
      this.showArtefato.push(false);
    }
    this.ArtefatoArrCheck = [];
  	console.log('clickAtivo: ' + this.difValue);
  }
  click(i){
    this.showArtefato[i]= !this.showArtefato[i];
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
      this.dbhelp._createPartfip(
          this.auth.userProfile.sub,
          this.partidanome,
          this.difValue,
          this.ArtefatoArrCheck,
          this.ListuserArrCheck
          );
      this.router.navigate(['/', 'fullinspec']);
    }
  }
}
