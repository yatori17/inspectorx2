import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
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
   temppartid: string;


  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, public auth: AuthService) { }

  ngOnInit() {
  	this.modinspbool = true;
  }

  ngOnDestroy() {
    this._removeUser();
  }

  public moderadorAtivo() {
  	console.log('moderador Ativo');
  	this.modinspbool = true;
    this._removeUser();
  }

  public inspetorAtivo() {
  	console.log('inspetor Ativo');
    if (this.modinspbool == true) {
        this._addUser();
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


