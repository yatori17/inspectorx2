import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListuserModel } from './../../core/models/listuser.model';
import { ApiService } from './../../core/api.service';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-fullinspec',
  templateUrl: './fullinspec.component.html',
  styleUrls: ['./fullinspec.component.scss']
})
export class FullinspecComponent implements OnInit {
  modinspbool: boolean;
  ListuserSub: Subscription;
  ListuserList: ListuserModel[];
  ListuserModelo: ListuserModel;
  ListuserSubRem: Subscription;
  ListuserListRem: ListuserModel[];
  ListuserModeloRem: ListuserModel;
  UserSub: Subscription;
  temppartid: string;
  User: ListuserModel;


  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, public auth: AuthService) { }

  ngOnInit() {
    this.modinspbool = true;
    this.getUsers();
  }


  ngOnDestroy() {
    //this._removeUser();
    this.moderadorAtivo();
    if(this.UserSub) this.UserSub.unsubscribe();
  }



  public moderadorAtivo() {
    this.User.online = false;
  	this.modinspbool = true;
    this.EditUser();
  }

  public inspetorAtivo() {
    this.User.online = true;
    if (this.modinspbool == true) {
        this.EditUser();
    }
    this.modinspbool = false;
  }


  calculateClasses() {
  	return {
  		btn: true,
  		'btn-secondary': true,
  		'active': this.modinspbool
  };
  	}

  	  calculateClasses2() {
  	return {
  		btn: true,
  		'btn-secondary': true,
  		'active': !this.modinspbool
  };
    }
    public getUsers(){
      this.UserSub= this.api.getUserById$(this.auth.userProfile.sub).subscribe(
        res=>{
        this.User = res
    }, err=>{ console.log(err)});
  }

    public EditUser(){
        this.api.putUser$(this.User._id, this.User).subscribe(

          res=>{

          }, err=>{
            console.log(err)
          }
        );
      }

  private _addUser() {
    //const respostaAtual = new Resposta(      );
      return new Promise(resolve => {
     const listuserModelo = new ListuserModel(
      this.auth.userProfile.sub,
      this.auth.userProfile.name
      );
      //this.partidaModelo = new PartidaModel();


    this.ListuserSub = this.api
      .postUsuarioOnline$(listuserModelo)
      .subscribe(
        res => {

          console.log('resultado useron');

          console.log(res.userId);
          this.temppartid = res.userId;
               resolve(this.temppartid);


        },
        err => {
          console.log(err);
          }
        );
      });
  }



  private _removeUser() {
    //const respostaAtual = new Resposta(      );
      return new Promise(resolve => {
     const ListuserModeloRem = new ListuserModel(
      this.auth.userProfile.sub,
      this.auth.userProfile.name
      );
      //this.partidaModelo = new PartidaModel();


    this.ListuserSub = this.api
      .removeUsuarioOnline$(ListuserModeloRem)
      .subscribe(
        res => {

          console.log('resultado remove user');



        },
        err => {
          console.log(err);
          }
        );
      });
  }

}


