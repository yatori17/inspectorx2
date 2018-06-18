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
  resolvequestList: QuestionModel[];
  loading: boolean;
  error: boolean;
	gamemode: string;
  partidaID: string;
  questionIndex: number;
  resposta: string;
  respostaCerta: boolean;
  questionLine: Array<string>;
  resString: string;

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) {
  	 this.gamemode = route.snapshot.paramMap.get('id');
     this.partidaID = route.snapshot.paramMap.get('id2');

     console.log(this.gamemode);
     console.log(this.partidaID);


  	 if(this.gamemode == 'medio') { console.log ('MEDIO SIM');}
     
    //this.questionIndex = Math.floor(Math.random()*(1-0+1)+0);

     //MODO FACIL
     if(this.gamemode == 'facil'){
         
     }

//     console.log(this.questionList[this.questionIndex].code);

    
   //this.resString = this.questionList[this.questionIndex].code;
   // this.questionLine = str.split("<br>");
   
   //console.log(this.questionLine);
  	 

   }

  ngOnInit() {
    this.questionIndex = 1;
  	this._getQuestionList().then(questionList => {
      console.log(questionList);
      this.resString = this.questionList[this.questionIndex].code;
      this.questionLine = this.resString.split("<br>");
      console.log(this.questionLine);
    })


   //console.log(this.questionList[this.questionIndex].code);
  }

 /* private questionSeparator(){
    var str = this.questionList[this.questionIndex].code;
    return str.split("<br>");
  }*/

  private _getQuestionList(){
    return new Promise(resolve => {
    console.log("iniciou questionlist");
    this.loading = true;

    this.questionListSub = this.api.getQuestions$().subscribe(
      res => {
        this.questionList = res;
        this.resolvequestList = res;
        this.loading = false;
        resolve(this.resolvequestList);
        
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
      )
  });
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
