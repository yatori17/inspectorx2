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
  loading: boolean;
  error: boolean;


  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) { }

  //Aqui eu vou querer chamar uma função que execute a criação de partida com a dificuldade selecionada e associando ao usuario logado atualmente

 ngOnInit() {
  	this._getPartidaList();
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
