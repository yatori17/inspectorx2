import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from './../../core/api.service';
import { ArtefatoModel } from './../../core/models/artefato.model';
import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

import { SplitArtifactService } from './../../service/split-artifact.service';
import { DbhelpService } from './../../service/dbhelp.service';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { QuillEditorComponent } from 'ngx-quill';

import * as QuillNamespace from 'quill';
const Quill: any = QuillNamespace;

import Counter from './counter';

Quill.register('modules/counter', Counter);



@Component({
  selector: 'app-fip-add',
  templateUrl: './fip-add.component.html',
  styleUrls: ['./fip-add.component.scss'],
  providers: [SplitArtifactService, DbhelpService]
})
export class FipAddComponent implements OnInit {
titleValue: string;
contentValue: string;
tempInicio: string;
tempFinal: string;
artefatoModelo: ArtefatoModel;

caretPos = 0;
defLine: Array<string>;
linearray: Array<boolean> = [];
defDescriptArray: Array<string> = [];
defTaxonomyArray: Array<string> = [];


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

  constructor(private api: ApiService, public auth: AuthService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, private service: SplitArtifactService, private dbhelp: DbhelpService) { }

  ngOnInit() {
  	this.titleValue = 'titulo';
	this.contentValue = 'valor';
  this.types = this.jones;
  }

  public indent() {
    console.log('indent');
    this.tempInicio = this.contentValue.slice(0, this.caretPos);
    this.tempFinal = this.contentValue.slice(this.caretPos);
    this.tempInicio = this.tempInicio.concat('');
    this.contentValue = this.tempInicio.concat(this.tempFinal);


    console.log(this.contentValue);

  }

 quillGetHTML(inputDelta) {
    const tempCont = document.createElement('div');
    (new Quill(tempCont)).setContents(inputDelta);
    return tempCont.getElementsByClassName('ql-editor')[0].innerHTML;
}

button(content: string){
  this.defLine = this.service.splitartifact(content);
}

  private HTMLSanitizer(code: string) {
    return this.sanitizer.bypassSecurityTrustHtml(code);
  }


  getCaretPos(oField) {
    console.log('caret');
    if (oField.selectionStart || oField.selectionStart == '0') {
       this.caretPos = oField.selectionStart;
    }
  }

  public _sendArtefato() {
  	console.log('Send artefato');
  	this.dbhelp._createArtefato(this.auth.userProfile.sub,
        this.titleValue,
        this.contentValue,
        this.linearray,
        this.defDescriptArray,
        this.defTaxonomyArray);
  }



}
