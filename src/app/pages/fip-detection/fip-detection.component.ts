import { Component, OnInit } from '@angular/core';
import { PartfipModel } from './../../core/models/partfip.model';
import { ArtefatoModel } from './../../core/models/artefato.model';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../core/api.service';
import { AuthService } from './../../auth/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-fip-detection',
  templateUrl: './fip-detection.component.html',
  styleUrls: ['./fip-detection.component.scss']
})
export class FipDetectionComponent implements OnInit {

	myBool: boolean;
  loading: boolean;
  error: boolean;
  ArtefatoSub: Subscription;
  ArtefatoList: ArtefatoModel[];
  ArtefatoModelo: ArtefatoModel;
  ArtefatoIdSub: Subscription;
  ArtefatoIdList: ArtefatoModel[];
  ArtefatoIdModelo: ArtefatoModel;
  PartfipSub: Subscription;
  PartfipList: PartfipModel[];
  PartfipModelo: PartfipModel;
  ArtefatoArray: Array<string> = [];
  types: Array<any>;
    public jones = [
  { value: 1, display: "Dados", description: "Ocorre quando uma estrutura de dados é manipulada de forma incorreta (por exemplo, quando se tenta acessar um índice inexistente de um vetor/matriz)." },
  { value: 2, display: "Inicialização", description: "Ocorre quando se tenta acessar uma variável que não foi inicializada." },
  { value: 3, display: "Comissão", description:  "Ocorre quando existe algum segmento de código que foi implementado incorretamente, i.e., cuja implementação é diferente do que foi especificado" },
  { value: 4, display: "Controle", description: "Ocorre quando um comando de desvio condicional é usado de forma incorreta." },
  { value: 5, display: "Excesso", description: "Existem trechos de código irrelevantes e desnecessários." },
  { value: 6, display: "Computação", description: "Ocorre quando um valor é definido erroneamente para uma variável." },
  { value: 7, display: "Desempenho", description: "Algumas rotinas executam comandos ou laços (loops) desnecessários." }
  ];

  public shull = [
  { value: 1, display: "Omissão", description: "Deve-se à omissão ou negligência de alguma informação necessária ao desenvolvimento do software." },
  { value: 2, display: "Ambiguidade", description: "Ocorre quando uma determinada informação não é bem definida, permitindo assim uma interpretação subjetiva, que pode levar a múltiplas interpretações." },
  { value: 3, display: "Fato incorreto", description: "Informações dos artefatos do sistema que são contraditórias com o conhecimento que se tem do domínio da aplicação." },
  { value: 4, display: "Inconsistência", description: "Ocorre quando duas ou mais informações são contraditórias entre si." },
  { value: 5, display: "Informação estranha", description: "Informação desnecessária incluída nos requisitos do software que esta sendo desenvolvido." },
  { value: 6, display: "Não há defeito", description: "Requisito correto"}
  ];


   constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, public auth: AuthService){}

  ngOnInit() {
  	this.types = this.jones;

    this._getArtefato().then(ArtefatoList =>{
    console.log(this.ArtefatoList);      
    });

    this._getPartfip().then(PartfipList =>{
    console.log(this.PartfipList);      
    });

  }
  
  private _getArtefato(){
    return new Promise(resolve => {
    //console.log("iniciou partidalist");
    this.loading = true;

    this.ArtefatoSub = this.api.getArtefato$().subscribe(
          res => 
        {
        this.ArtefatoList = res;
            this.loading = false;
            resolve(this.ArtefatoList)
            
          },
          err => {
            console.error(err);
            this.loading = false;
            this.error = true;
          }
          )
      });
    }



    private artefatoarray(arr: any){
    	console.log("artefato array");
    	
    	this.ArtefatoArray = arr;
    	console.log(this.ArtefatoArray);
    }

    private _getArtefatoById(id: string){

    	console.log(id);
    return new Promise(resolve => {
    console.log("iniciou artefatobyid");
    this.loading = true;

    this.ArtefatoIdSub = this.api.getArtefatoById$(id).subscribe(
      res => {
        this.ArtefatoIdList= res;
   
        this.loading = false;
   
       console.log(this.ArtefatoIdList);
        
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
      )
  });
  }

    private _getPartfip(){
    return new Promise(resolve => {
    //console.log("iniciou partidalist");
    this.loading = true;

    this.PartfipSub = this.api.getPartfip$().subscribe(
          res => 
        {
        this.PartfipList = res;
            this.loading = false;
            resolve(this.PartfipList)
            
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
