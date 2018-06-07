import { PartidaModel, Resposta } from './../../core/models/partida.model';
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
  respostaAtual: Resposta;
  loading: boolean;
  error: boolean;
  idPartida: string;



  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) { }

  //Aqui eu vou querer chamar uma função que execute a criação de partida com a dificuldade selecionada e associando ao usuario logado atualmente

 ngOnInit() {

  this.idPartida = 'hey hey';
  	this._getPartidaList();
  }


  private clickFacil(){
     console.log("CLICK FACIL EXECUTADO");
      this._createPartida();
      this.router.navigate(['/', 'game', 'facil', this.idPartida]);

      // ativar partida com atributo facil

      // ajeitar o router ( e de algum jeito de enviar junto o ID da partida)

  }

  private clickMedio(){
          console.log("CLICK MEDIO EXECUTADO");
      this.router.navigate(['/', 'game', 'medio', this.idPartida]);
  }

  private clickDificil(){
          console.log("CLICK DIFICIL EXECUTADO");
      this.router.navigate(['/', 'game', 'dificil', this.idPartida]);
  }

  private _createPartida(){
    const respostaAtual = new Resposta(
      1,
      "trechoteste",
      "Computação"
      );

     const partidaModelo = new PartidaModel(
      "Teste1",
      "Fácil",
      [respostaAtual]
      );
      //this.partidaModelo = new PartidaModel();

    this.partidaListSub = this.api
      .postPartida$(this.partidaModelo)
      .subscribe(
        data => {
          console.log("resultado createpartida");
        },
        err => {
          console.log(err);
          }
        );
      
  }

  private _getPartidaList(){
    console.log("iniciou partidalist");
    this.loading = true;

    this.partidaListSub = this.api.getPartidas$().subscribe(
      res => {
        this.partidaList = res;
        this.loading = false;
        console.log(this.partidaList[0].resposta[0].trecho);
        
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
      )
  }
}
