import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//RXJS
import { Subscription } from 'rxjs/Subscription';
//Services
import { AuthService } from './../../auth/auth.service';
import { DbhelpService } from './../../service/dbhelp.service';


@Component({
  selector: 'app-fip-create',
  templateUrl: './fip-create.component.html',
  styleUrls: ['./fip-create.component.scss'],
  providers: [DbhelpService]
})

export class FipCreateComponent implements OnInit {
  difValue: number = 0;
  partidanome: string = null;
  ListuserList: any;
  ArtefatoList: any;
  ListuserArrCheck: Array<string> = [];
  ArtefatoArrCheck: Array<string> = [];
  InspecListFail: boolean;
  ArtifListFail: boolean;

constructor(private router: Router, public auth: AuthService, private dbhelp: DbhelpService) { }

  ngOnInit() {
    this.dbhelp._getListuser().then(res =>{
      this.ListuserList = res;
    })

    this.dbhelp._getArtefato().then(res => {
      this.ArtefatoList = res;
    })
  }

  clickAtivo(value: number) {
    //Isso vai modificar a dificuldade em algum momento
  	this.difValue = value;
    for (const artefato of this.ArtefatoList){
      artefato.isActive = false;
    }
    this.ArtefatoArrCheck = [];
  	console.log('clickAtivo: ' + this.difValue);
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
