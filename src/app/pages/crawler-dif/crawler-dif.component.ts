import { PartidaModel } from './../../core/models/partida.model';
import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { QuestionModel } from './../../core/models/question.model';
import { ApiService } from './../../core/api.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-crawler-dif',
  templateUrl: './crawler-dif.component.html',
  styleUrls: ['./crawler-dif.component.scss']
})
export class CrawlerDifComponent implements OnInit {
  partidaListSub: Subscription;
  partidaList: PartidaModel[];
  partidaModelo: PartidaModel;
  //respostaAtual: Resposta;
  loading: boolean;
  error: boolean;
  idPartida: string;
  temppartid: string;
  modoinspecao: number;




  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, public auth: AuthService) { }

  //Aqui eu vou querer chamar uma função que execute a criação de partida com a dificuldade selecionada e associando ao usuario logado atualmente

 ngOnInit() {


  }

  public inspecao (modo: number) {
    this.modoinspecao = modo;
  }

  private navRouting(modo: number, dificuldade: string, partidaID: string, numquestao: number) {
    console.log('navrouting executado');
    console.log(dificuldade);
    console.log(partidaID);
    this.router.navigate(['/', 'game', modo, dificuldade, partidaID, numquestao]);
  }



  public clickFacil() {
     console.log('CLICK FACIL EXECUTADO');
     console.log(this.auth.userProfile.sub);

    this._createPartida('Fácil', this.modoinspecao)
        .then(temppartid => {
              this.navRouting(this.modoinspecao, 'facil', this.temppartid, 1);

        });
  }

  public clickMedio() {
      //console.log("CLICK MEDIO EXECUTADO");

    this._createPartida('Médio', this.modoinspecao)
        .then(temppartid => {
              this.navRouting(this.modoinspecao, 'medio', this.temppartid, 1);

     });
  }

  public clickDificil() {
      // console.log("CLICK DIFICIL EXECUTADO");

     this._createPartida('Difícil', this.modoinspecao)
        .then(temppartid => {
              this.navRouting(this.modoinspecao, 'dificil', this.temppartid, 1);

     });

  }



  private _createPartida(dificuldade: string, modo: number) {
    //const respostaAtual = new Resposta(      );
      return new Promise(resolve => {
     const partidaModelo = new PartidaModel(
      this.auth.userProfile.sub,
      dificuldade,
      modo
      );
      //this.partidaModelo = new PartidaModel();
      console.log('crawler-dif: ');
      console.log(partidaModelo);


    this.partidaListSub = this.api
      .postPartida$(partidaModelo)
      .subscribe(
        res => {

          console.log('resultado createpartida');

          console.log(res._id);
          this.temppartid = res._id;
               resolve(this.temppartid);


        },
        err => {
          console.log(err);
          }
        );
  });
}

  private _getPartidaList() {
    //console.log("iniciou partidalist");
    this.loading = true;

    this.partidaListSub = this.api.getPartidas$().subscribe(
      res => {        this.partidaList = res;
        this.loading = false;
        //console.log(this.partidaList[0].resposta[0].trecho);

      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
      );
  }

  ngOnDestroy() {

  }

}
