import { Component, OnInit } from '@angular/core';
import { RespostaModel } from './../../core/models/resposta.model';
import { QuestionModel } from './../../core/models/question.model';
import { ApiService } from './../../core/api.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-crawlend',
  templateUrl: './crawlend.component.html',
  styleUrls: ['./crawlend.component.scss']
})
export class CrawlendComponent implements OnInit {
	respostaListSub: Subscription;
	respostaList: RespostaModel[];
	respostaModelo: RespostaModel;
	questionListSub: Subscription;
  	questionList: QuestionModel[];
  	resolvequestList: QuestionModel[];
  	codeLine: String[];
  	codeArray: Array<Array<String>>;
  	setnumber: number;
	loading: boolean;
	error: boolean;
	partidaID: string;
	types: Array<any>;
  dific: string;

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


  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  	this.route.params.forEach(params => {
  		this.partidaID = params['id'];
  	});

  	this._getRespostaList(this.partidaID);
  	this.codeLine = [];
  	this.codeArray = [];

  	this._getQuestionList().then(questionList => {
      console.log(questionList);

      for (let k = 0; k < this.respostaList.length ; k++) {
        /*	console.log(this.questionList[k].question);
		      this.setnumber = this.questionList[k].question;
        	this.codeLine[this.setnumber] = this.questionList[k].code;
        	this.codeArray[this.setnumber] = this.codeLine[this.setnumber].split("//QUEBRALINHA");*/
         for (let _i = 0; _i < this.questionList.length; _i++) {
             if (this.respostaList[k].idPergunta == this.questionList[_i].question) {
                 this.setnumber = this.questionList[_i].question;
                 this.dific = this.questionList[_i].difficulty;
                 this.codeLine[this.setnumber] = this.questionList[_i].code;
                 this.codeArray[this.setnumber] = this.codeLine[this.setnumber].split('//QUEBRALINHA');

             }
         }

      }
      if (this.respostaList[0].modo == 1) {
        this.types = this.jones;
      }
      if (this.respostaList[0].modo == 2) {
        this.types = this.shull;
      }

        console.log(this.dific);
     	console.log('Executado o nginit');
     	console.log(this.codeArray);

    });

  }

  private _toRoute() {
      this.navRouting (this.respostaList[0].modo, this.questionList[1].difficulty.toLowerCase(), this.partidaID, this.respostaList.length + 1);
  }

  private navRouting(modo: number, dificuldade: string, partidaID: string, numquestao: number) {
    console.log('navrouting executado');
    console.log(dificuldade);
    console.log(partidaID);
    this.router.navigate(['/', 'game', modo, dificuldade, partidaID, numquestao]);
  }

  private HTMLSanitizer(code: string) {
    return this.sanitizer.bypassSecurityTrustHtml(code);
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

  private _typeReturn(typeNum: number) {
  	for (const element of this.types) {
  		if (typeNum == element.value) { return element.display; }
  	}
  }

  private _getRespostaList(idPartida: string) {
    return new Promise(resolve => {
    console.log('iniciou partidaresposta');
    this.loading = true;

    this.respostaListSub = this.api.getResposta$(idPartida).subscribe(
      res => {
        this.respostaList = res;
        //this.resolvequestList = res;
        this.loading = false;
       // resolve(this.resolvequestList);
       console.log(this.respostaList);

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

