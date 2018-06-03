import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { QuestionModel } from './../../core/models/question.model';
import { PartidaModel } from './../../core/models/partida.model';
import { ApiService } from './../../core/api.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {
  questionListSub: Subscription;
  questionList: QuestionModel[];
  loading: boolean;
  error: boolean;
	gamemode: string;
  questionIndex: number;
  resposta: string;
  respostaCerta: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) {
  	 this.gamemode = route.snapshot.paramMap.get('id');
  	 if(this.gamemode == 'medio') { console.log ('MEDIO SIM');}
  	 console.log(this.gamemode);
    this.questionIndex = Math.floor(Math.random()*(1-0+1)+0);

     //MODO FACIL
     if(this.gamemode == 'facil'){
         
     }
  	 

   }

  ngOnInit() {
  	this._getQuestionList();
  }

  private _getQuestionList(){
    console.log("iniciou questionlist");
    this.loading = true;

    this.questionListSub = this.api.getQuestions$().subscribe(
      res => {
        this.questionList = res;
        this.loading = false;
        
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
      )
  }

  private _randomGen(){
    return Math.floor(Math.random() * 1);
  }


  private _AnswerCompare(value1: string, value2: string){
     if (value1.trim() == value2.trim()){
       console.log("COMPARE CERTO");
       this.respostaCerta = true;
      }
     else {
       console.log("COMPARE ERRADO")
       this.respostaCerta = false;
     }
  }

  private _getAnswerForm(value: string){
    this.resposta = value;
    console.log(this.resposta);
    this._AnswerCompare(this.resposta, this.questionList[this.questionIndex].trecho);
  }

  ngAfterViewInit(){
    console.log(this.questionList);

  }

   ngOnDestroy() {
    this.questionListSub.unsubscribe();
  }

}
