import { Component, OnInit } from '@angular/core';
import { PartidaModel } from './../../core/models/partida.model';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { ApiService } from './../../core/api.service';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.scss']
})
export class PartidasComponent implements OnInit {
  partidaListSub: Subscription;
  partidaList: PartidaModel[];
  partidaModelo: PartidaModel;
  //respostaAtual: Resposta;
  loading: boolean;
  error: boolean;
  idPartida: string;
  temppartid: string;



   constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, public auth: AuthService) { }

  ngOnInit() {
  	this._getPartidaList().then(partidaList => {
  	console.log(this.partidaList);
  	});

  }

  private _getPartidaList() {
  	return new Promise(resolve => {
    //console.log("iniciou partidalist");
    this.loading = true;

    this.partidaListSub = this.api.getPartidas$().subscribe(
      res => {
		this.partidaList = res;
        this.loading = false;
        resolve(this.partidaList);

      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
      );
});
  }

}
