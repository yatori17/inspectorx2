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
	public types = [
 	{ value: 1, display: "Dados" },
 	{ value: 2, display: "Inicialização" },
 	{ value: 3, display: "Comissão" },
 	{ value: 4, display: "Controle" },
 	{ value: 5, display: "Excesso" },
 	{ value: 6, display: "Computação" },
 	{ value: 7, display: "Desempenho" }
 	];

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  	this.route.params.forEach(params => {
  		this.partidaID = params["id"];
  	})

  	this._getRespostaList(this.partidaID);
  	this.codeLine = [];
  	this.codeArray = [];

  	this._getQuestionList().then(questionList => {
      console.log(questionList);

      for (var k = 0; k < this.respostaList.length ; k++){
      	console.log(this.questionList[k].question);
		this.setnumber = this.questionList[k].question;
      	this.codeLine[this.setnumber] = this.questionList[k].code;
      	this.codeArray[this.setnumber] = this.codeLine[this.setnumber].split("//QUEBRALINHA");

      }
      	console.log("Executado o nginit")
            	console.log(this.codeArray);

    })

  }

  private _toRoute(){
      this.navRouting (this.questionList[1].difficulty, this.partidaID, this.respostaList.length + 1);
  }

  private navRouting(dificuldade: string, partidaID: string, numquestao: number){
    console.log("navrouting executado");
    console.log(dificuldade);
    console.log(partidaID);
    this.router.navigate(['/', 'game', dificuldade, partidaID, numquestao]);
  };

  private HTMLSanitizer(code: string){
    return this.sanitizer.bypassSecurityTrustHtml(code);
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

  private _typeReturn(typeNum: number){
  	for(let element of this.types){
  		if (typeNum == element.value) return element.display;
  	}
  }

  private _getRespostaList(idPartida: string){
    return new Promise(resolve => {
    console.log("iniciou partidaresposta");
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
      )
  });
  }
}

