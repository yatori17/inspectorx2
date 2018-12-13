import { Component, OnInit } from '@angular/core';
import { PartfipModel } from './../../core/models/partfip.model';
import { RespfipModel } from './../../core/models/respfip.model';
import { ArtefatoModel } from './../../core/models/artefato.model';
import { ConferefipModel } from './../../core/models/conferefip.model';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from './../../core/api.service';
import { AuthService } from './../../auth/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-fip-discrim',
  templateUrl: './fip-discrim.component.html',
  styleUrls: ['./fip-discrim.component.scss']
})
export class FipDiscrimComponent implements OnInit {
  	myBool: boolean;
  loading: boolean;
  error: boolean;

  PartfipSub: Subscription;
  PartfipList: PartfipModel[];
  PartfipModelo: PartfipModel;

  RespfipSub: Subscription;
  RespfipList: RespfipModel[];
  RespfipModelo: RespfipModel;

  ArtefatoIdSub: Subscription;
  ArtefatoIdList: ArtefatoModel[];
  ArtefatoIdModelo: ArtefatoModel;

  ConferefipSub: Subscription;
  ConferefipList: ConferefipModel[];
  ConferefipModelo: ConferefipModel;

  RespfipArray: Array<string> = [];
  ArtefatoArray: Array<string> = [];

  partida: string;
  artefato: string;
  titleValue: string;
  contentValue: string;
  tempInicio: string;
  tempFinal: string;
  defLine: Array<string>;
  linearray: Array<boolean> = [];
  detDescriptArray: Array<string> = [];
  detTaxonomyArray: Array<string> = [];
  pstringinicio = '<p>';
  pstringfinal = '</p>';
  disableArray: Array<boolean> = [];

  selectedValue: any;
  selectedRespfip: any;
  selectedType: any;
  selectedArtifact: any;

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


  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, public auth: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.types = this.jones;


  	this._getDiscrimPartfip().then(PartfipList => {
    console.log(this.PartfipList);
    });
  }

  public results() {

    // criar resultado final
    // Pego o primeiro respfip da lista e pego o artefato correspondente com artefatoid
    // comparar ambos. defectbool e defecttaxonomy pra cada linha.




    this.router.navigate(['/', 'fipresults', this.selectedValue._id]);
  }

  public artefatoarray(arr: any) {
    	console.log('artefato array');
    	this.ArtefatoArray = arr;
  /*   this._getRespfip().then(Respfip2List =>{
    console.log(this.Respfip2List);
    });*/
    	console.log(this.ArtefatoArray);
    }

      private HTMLSanitizer(code: string) {
    return this.sanitizer.bypassSecurityTrustHtml(code);
  }

  public _modelchangeartefato(id: string) {
    console.log('zerar?');
    this.linearray = [];
    this.detDescriptArray = [];
    this.detTaxonomyArray = [];
    this._getArtefatoByUse(id);
  }

  public _getArtefatoByUse(id: string) {

    console.log(id);
    return new Promise(resolve => {
    console.log('iniciou artefatobyid');
    this.loading = true;

    this.ArtefatoIdSub = this.api.getArtefatoById$(id).subscribe(
      res => {
        this.ArtefatoIdList = res;

        this.loading = false;

       console.log(this.ArtefatoIdList);

        this.splitsplit();

      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
      );

  });
  }

 public splitsplit() {
    this.defLine = this.ArtefatoIdList[0].content.split('</p><p>');
     for (let _i = 0; _i < this.defLine.length; _i++) {
       if (_i == 0) {
           this.defLine [_i] = this.defLine[_i].concat('</p>');
        } else
        if (_i == this.defLine.length - 1) {
           this.defLine[this.defLine.length - 1] = this.pstringinicio.concat(this.defLine[this.defLine.length - 1]);
        } else {
          this.defLine[_i] = this.pstringinicio.concat(this.defLine[_i]);
          this.defLine [_i] = this.defLine[_i].concat('</p>');
        }
     } this.defLine;
    console.log(this.defLine);
}


  public _getDiscrimRespfip(partida: string) {
    return new Promise(resolve => {
    //console.log("iniciou partidalist");
    this.loading = true;

    this.RespfipSub = this.api.getDiscrimRespfipById$(partida).subscribe(
          res => {
        this.RespfipList = res;
            this.loading = false;
            resolve(this.RespfipList);

          },
          err => {
            console.error(err);
            this.loading = false;
            this.error = true;
          }
          );
    });
  }

 	public _getDiscrimPartfip() {
    return new Promise(resolve => {
    console.log('iniciou partfip');
    this.loading = true;

    this.PartfipSub = this.api.getDiscrimPartfip$(this.auth.userProfile.sub).subscribe(
          res => {
        this.PartfipList = res;
            this.loading = false;
            resolve(this.PartfipList);

          },
          err => {
            console.error(err);
            this.loading = false;
            this.error = true;
          }
          );
      });
    }

    private _createRespfip() {
    //const respostaAtual = new Resposta(      );
      return new Promise(resolve => {

   const respfipModelo = new RespfipModel(
        this.auth.userProfile.sub,
        this.selectedValue._id,
        this.selectedArtifact,
        'teste',
        this.linearray,
        this.detDescriptArray,
        this.detTaxonomyArray,
        false,
        'placeholder'
    );

    this.RespfipSub = this.api
      .postRespfip$(respfipModelo)
      .subscribe(
        res => {

          console.log('resultado respfip');

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


    private _createConferefip() {
    //const respostaAtual = new Resposta(      );
      return new Promise(resolve => {

   const conferefipModelo = new ConferefipModel(
        this.auth.userProfile.sub,
        this.selectedValue._id,
        this.selectedRespfip.artefatoId,
        this.selectedRespfip._id,
        'teste',
        this.linearray,
        this.detDescriptArray,
        this.detTaxonomyArray
    );

    this.ConferefipSub = this.api
      .postConferefip$(conferefipModelo)
      .subscribe(
        res => {

          console.log('resultado conferefip');

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

}
