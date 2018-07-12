import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../core/api.service';
import { ArtefatoModel } from './../../core/models/artefato.model';
import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-fip-add',
  templateUrl: './fip-add.component.html',
  styleUrls: ['./fip-add.component.scss']
})
export class FipAddComponent implements OnInit {
titleValue: string;
contentValue: string;
artefatoModelo: ArtefatoModel;
 artefatoListSub: Subscription;




  constructor(private api: ApiService, public auth: AuthService) { }

  ngOnInit() {
  	this.titleValue = 'titulo'; 
	this.contentValue = 'valor';
  }

  public _sendArtefato(){
  	console.log("Send artefato");
  	this._createArtefato();
  }

  private _createArtefato(){
    //const respostaAtual = new Resposta(      );
      return new Promise(resolve => {
     
   const artefatoModelo = new ArtefatoModel(
        this.auth.userProfile.sub,
        this.titleValue,
        this.contentValue
    );

    this.artefatoListSub = this.api
      .postArtefato$(artefatoModelo)
      .subscribe(
        res => {
  
          console.log("resultado createresposta");      
     
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
