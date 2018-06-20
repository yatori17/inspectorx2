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
  codeLine: Array<string>;
  resString: string;
  indexofcodeLine: number;
  checkedAnswer: boolean;
  checkedRadio: boolean;
  resultadoTipo: number;
  numquestao: string;
  public types = [
  { value: 1, display: "Dados" },
  { value: 2, display: "Inicialização" },
  { value: 3, display: "Comissão" },
  { value: 4, display: "Controle" },
  { value: 5, display: "Excesso" },
  { value: 6, display: "Computação" },
  { value: 7, display: "Desempenho" }
  ]

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) {
  	// this.gamemode = route.snapshot.paramMap.get('id');
    // this.partidaID = route.snapshot.paramMap.get('id2');
    //this.numquestao = route.snapshot.paramMap.get('id3');

  


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
   this.route.params.forEach(params => {
     this.gamemode = params["id"];
     this.partidaID = params["id2"];
     this.numquestao = params["id3"];
     console.log("params");
     console.log(params);



      console.log("Modo de jogo: " + this.gamemode);
     console.log("ID da Partida: " + this.partidaID);
     console.log("Numero da questao: " + this.numquestao);

    this.questionIndex = ((Number(this.numquestao))-1);
  if (this.questionIndex > 10-1){ 
        this.router.navigate(['/', 'crawlend']);
    }
    this._getQuestionList().then(questionList => {
      console.log(questionList);
      this.resString = this.questionList[this.questionIndex].code;
      this.codeLine = this.resString.split("<br>");
      console.log(this.codeLine);
    })

  this.resposta = "";
  this.respostaCerta = false;
  this.checkedAnswer = false;
  this.checkedRadio = false
  //resultadoTipo: number;
  //numquestao: string;

  if (this.questionIndex > 10){ 
      this.router.navigate(['/', 'crawlend']);
    }


   });





   //console.log(this.questionList[this.questionIndex].code);
  }

 /* private questionSeparator(){
    var str = this.questionList[this.questionIndex].code;
    return str.split("<br>");
  }*/

  private lineValue(value: number){
    
    this.indexofcodeLine = value;
    console.log(this.indexofcodeLine);

  }

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

  private _typeCompare(value1: number, value2: string){
    for (let element of this.types){
      if (element.value == value1) {
        if(element.display == value2){
          console.log(element.display + " =yes= " + value2);
          console.log("ACERTOU O RADIO VALUE");
        } else {
          console.log(element.display + " =no= " + value2);
          console.log("ERROU O RADIO VALUE");
        }

      }
    }
    this.router.navigate(['/', 'game', this.gamemode, this.partidaID, (Number(this.numquestao))+1]);
  }

  private _getAnswerForm(value: string){
    this.resposta = value;
    console.log(this.resposta);
    this._AnswerCompare(this.resposta, this.questionList[this.questionIndex].trecho);
    this.checkedAnswer = true;
  }

  private _getRadioForm(value: number){
    this.checkedRadio = true
    console.log(value);
    this._typeCompare(value, this.questionList[this.questionIndex].type);
  }

  ngAfterViewInit(){
    console.log(this.questionList);

  }

   ngOnDestroy() {
    this.questionListSub.unsubscribe();
  }

}