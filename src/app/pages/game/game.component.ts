import { Component, OnInit, AfterViewInit, ViewEncapsulation  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { QuestionModel } from './../../core/models/question.model';
import { PartidaModel } from './../../core/models/partida.model';
import { RespostaModel } from './../../core/models/resposta.model';
import { ApiService } from './../../core/api.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../../auth/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameComponent implements OnInit, AfterViewInit {
  questionListSub: Subscription;
  questionList: QuestionModel[];
  resolvequestList: QuestionModel[];
  respostaModelo: RespostaModel;
  respostaListSub: Subscription;
  respostaList: RespostaModel[];

  respostaListSubL;
  loading: boolean;
  error: boolean;
	gamemode: string;
  partidaID: string;
  questionIndex: number;
  insideIndex: number;
  resposta: number;
  respostaCerta: boolean;
  codeLine: Array<string>;
  resString: string;
  indexofcodeLine: number;
  checkedAnswer: boolean;
  checkedRadio: boolean;
  resultadoTipo: number;
  tipoCerto: boolean;
  numquestao: string;
  specificQuestion: number;
  respondido: boolean;
  taxID: number;
  inspecao: number;
  indexestoDelete: Array<any>;

  types: Array<any>;

  public jones = [
  { value: 1, display: 'Dados', description: 'Ocorre quando uma estrutura de dados é manipulada de forma incorreta (por exemplo, quando se tenta acessar um índice inexistente de um vetor/matriz).' },
  { value: 2, display: 'Inicialização', description: 'Ocorre quando se tenta acessar uma variável que não foi inicializada.' },
  { value: 3, display: 'Comissão', description:  'Ocorre quando existe algum segmento de código que foi implementado incorretamente, i.e., cuja implementação é diferente do que foi especificado' },
  { value: 4, display: 'Controle', description: 'Ocorre quando um comando de desvio condicional é usado de forma incorreta.' },
  { value: 5, display: 'Excesso', description: 'Existem trechos de código irrelevantes e desnecessários.' },
  { value: 6, display: 'Computação', description: 'Ocorre quando um valor é definido erroneamente para uma variável.' },
  { value: 7, display: 'Desempenho', description: 'Algumas rotinas executam comandos ou laços (loops) desnecessários.' }
  ];

  public shull = [
  { value: 1, display: 'Omissão', description: 'Deve-se à omissão ou negligência de alguma informação necessária ao desenvolvimento do software.' },
  { value: 2, display: 'Ambiguidade', description: 'Ocorre quando uma determinada informação não é bem definida, permitindo assim uma interpretação subjetiva, que pode levar a múltiplas interpretações.' },
  { value: 3, display: 'Fato incorreto', description: 'Informações dos artefatos do sistema que são contraditórias com o conhecimento que se tem do domínio da aplicação.' },
  { value: 4, display: 'Inconsistência', description: 'Ocorre quando duas ou mais informações são contraditórias entre si.' },
  { value: 5, display: 'Informação estranha', description: 'Informação desnecessária incluída nos requisitos do software que esta sendo desenvolvido.' },
  { value: 6, display: 'Não há defeito', description: 'Requisito correto'}
  ];

  html: SafeHtml;

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private sanitizer: DomSanitizer) {
  	// this.gamemode = route.snapshot.paramMap.get('id');
    // this.partidaID = route.snapshot.paramMap.get('id2');
    //this.numquestao = route.snapshot.paramMap.get('id3');




  	 if (this.gamemode == 'medio') { console.log ('MEDIO SIM'); }

    //this.questionIndex = Math.floor(Math.random()*(1-0+1)+0);

     //MODO FACIL


//     console.log(this.questionList[this.questionIndex].code);


   //this.resString = this.questionList[this.questionIndex].code;
   // this.questionLine = str.split("<br>");

   //console.log(this.questionLine);


   }

  ngOnInit() {
   this.route.params.forEach(params => {
     this.gamemode = params['id'];
     this.partidaID = params['id2'];
     this.numquestao = params['id3'];
     this.inspecao = params['modoinsp'];
     console.log('params');
     console.log(params);

     this.indexestoDelete = [];


      console.log('Modo de jogo: ' + this.gamemode);
     console.log('ID da Partida: ' + this.partidaID);
     console.log('Numero da questao: ' + this.numquestao);

    this.questionIndex = ((Number(this.numquestao)) - 1);
  if (this.questionIndex > 10 - 1) {
        this.router.navigate(['/', 'crawlend', this.partidaID]);
    }
    this._getQuestionList().then(questionList => {
      console.log(questionList);
      console.log('for');
      for (let _i = 0; _i < this.questionList.length; _i++) {
      if (this.questionList[_i].taxonomyid != this.inspecao) {
          this.indexestoDelete.push(_i);
         }
      }

      for (let _k = this.indexestoDelete.length - 1; _k >= 0; _k--) {
        this.questionList.splice(this.indexestoDelete[_k], 1);
      }

    console.log(this.indexestoDelete);

     // this.questionList.splice(3,1);
      console.log('splice');
            console.log(questionList);
      this.taxID = this.questionList[this.questionIndex].taxonomyid;
      this.specificQuestion = this.questionList[this.questionIndex].question;
      this.resString = this.questionList[this.questionIndex].code;
      this.codeLine = this.resString.split('//QUEBRALINHA');
      console.log(this.codeLine);

     if (this.gamemode == 'facil') {
         this.indexofcodeLine = this.questionList[this.questionIndex].trecho;
         this._getAnswerForm(this.questionList[this.questionIndex].trecho);
     }

      if (this.taxID == 1) {
        this.types = this.jones;
      }
      if (this.taxID == 2) {
        this.types = this.shull;
      }
    });


    //Guardar a resposta no banco, index ((Number(this.numquestao))-1)
   /* this.respostaModelo = new RespostaModel(
        this.partidaID,
        Number(this.numquestao),
        this.resposta,
        this.resultadoTipo,
        this.respostaCerta,
        this.tipoCerto
    );*/


      console.log(this.jones);
      console.log(this.types);


    console.log(this.respostaModelo);




  if (this.taxID == 1) {
    this.indexofcodeLine = null;
  } else {
    this.indexofcodeLine = 0;
  }
  this.resposta = null;
  this.respostaCerta = false;
  this.checkedAnswer = false;
  this.checkedRadio = false;
  this.respondido = false;
  //resultadoTipo: number;
  //numquestao: string;

  /*if (this.questionIndex > 10){
      this.router.navigate(['/', 'crawlend']);
    }*/


   });





   //console.log(this.questionList[this.questionIndex].code);
  }

 /* private questionSeparator(){
    var str = this.questionList[this.questionIndex].code;
    return str.split("<br>");
  }*/

  private HTMLSanitizer(code: string) {
    return this.sanitizer.bypassSecurityTrustHtml(code);
  }

  private lineValue(value: number) {

    this.indexofcodeLine = value;
    console.log(this.indexofcodeLine);

  }

  private _getQuestionList() {
    return new Promise(resolve => {
    console.log('iniciou questionlist');
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
      );
  });
  }

  private _randomGen() {
    return Math.floor(Math.random() * 1);
  }


  private _AnswerCompare(indexvalue: number, textvalue: number) {
     if (indexvalue == textvalue) {
       console.log('COMPARE CERTO');
       this.respostaCerta = true;
      } else {
       console.log('COMPARE ERRADO');
       this.respostaCerta = false;
     }
  }

  private _typeCompare(value1: number, value2: string) {
    for (const element of this.types) {
      if (element.value == value1) {
        if (element.display == value2) {
          this.tipoCerto = true;
          console.log(element.display + ' =yes= ' + value2);
          console.log('ACERTOU O RADIO VALUE');
        } else {
          this.tipoCerto = false;
          console.log(element.display + ' =no= ' + value2);
          console.log('ERROU O RADIO VALUE');
        }

      this._createResposta();
      }
    }
    this.respondido = true;
  }

  private _nextQuestion() {
        this.router.navigate(['/', 'game', this.inspecao, this.gamemode, this.partidaID, (Number(this.numquestao)) + 1]);
  }

  private _getAnswerForm(value: number) {
    this.resposta = value;
    console.log(this.resposta);
    this._AnswerCompare(this.resposta, this.questionList[this.questionIndex].trecho);
    this.checkedAnswer = true;
  }

  private _getRadioForm(value: number) {
    if (value == null) {
       console.log('radio nao é valido');
    } else {
    this.checkedRadio = true;
    console.log(value);
    this._typeCompare(value, this.questionList[this.questionIndex].type);
    }
  }



    private _createResposta() {
    //const respostaAtual = new Resposta(      );
      return new Promise(resolve => {

   const respostaModelo = new RespostaModel(
        this.partidaID,
        this.specificQuestion,
        Number(this.numquestao),
        this.resposta,
        this.resultadoTipo,
        this.respostaCerta,
        this.tipoCerto,
        this.inspecao
    );

      //this.partidaModelo = new PartidaModel();
      console.log('game component: ');
      console.log(respostaModelo);


    this.respostaListSub = this.api
      .postResposta$(respostaModelo)
      .subscribe(
        res => {

          console.log('resultado createresposta');

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

  ngAfterViewInit() {
    console.log(this.questionList);

  }

   ngOnDestroy() {
    this.questionListSub.unsubscribe();
  }

}
