import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
//Services
import { AuthService } from './../../auth/auth.service';
import { SplitArtifactService } from './../../service/split-artifact.service';
import { DbhelpService } from './../../service/dbhelp.service';
//rxjs
import { Subscription } from 'rxjs/Subscription';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
//plugin
import { QuillEditorComponent } from 'ngx-quill';
import * as QuillNamespace from 'quill';
const Quill: any = QuillNamespace;

@Component({
  selector: 'app-fip-add',
  templateUrl: './fip-add.component.html',
  styleUrls: ['./fip-add.component.scss'],
  providers: [SplitArtifactService, DbhelpService]
})

export class FipAddComponent implements OnInit {
  titleValue: string;
  contentValue: string;
  TaxonomiaList: any;
  defLine: Array<string>;
  linearray: Array<boolean> = [];
  defDescriptArray: Array<string> = [];
  defTaxonomyArray: Array<string> = [];
  types: Array<any>;
  adicionardefeitoativado: boolean = false;
  taxvalue: string;
  qtyDefect: number;
  taxselected: any;

  constructor(public auth: AuthService, private sanitizer: DomSanitizer, private service: SplitArtifactService, private dbhelp: DbhelpService) { }

  ngOnInit() {
  	this.titleValue = 'titulo';
	  this.contentValue = 'valor';

    this.dbhelp._getTaxonomia().then(res=> {
      this.TaxonomiaList = res;
      console.log(this.TaxonomiaList);
    })
  }

  public changeTaxonomy(){
    this.types = this.taxselected.value;
    console.log(this.types);
  }



  quillGetHTML(inputDelta) {
    const tempCont = document.createElement('div');
    (new Quill(tempCont)).setContents(inputDelta);
    return tempCont.getElementsByClassName('ql-editor')[0].innerHTML;
  }

  button(content: string){
    this.adicionardefeitoativado = true;
    this.defLine = this.service.splitartifact(content);
    this.linearray = [];
    this.defDescriptArray = [];
    this.defTaxonomyArray = [];
    for(var _i = 0; _i < this.defLine.length; _i++){
      this.linearray.push(false);
      this.defDescriptArray.push(null);
      this.defTaxonomyArray.push(null);
    }
  }

  private HTMLSanitizer(code: string) {
    return this.sanitizer.bypassSecurityTrustHtml(code);
  }

  public Artefato_Send() {
  	console.log('Send artefato');

    this.qtyDefect = 0;


    for(var _i = 0; _i < this.defLine.length; _i++){
      if (this.linearray[_i] == false){
        this.defDescriptArray[_i] = null;
        this.defTaxonomyArray[_i] = null;
      } else {
        this.qtyDefect++;
      }
    }

    console.log(this.defTaxonomyArray);

  	this.dbhelp._createArtefato(this.auth.userProfile.sub,
                                this.titleValue,
                                this.taxselected._id,
                                this.contentValue,
                                this.linearray,
                                this.defDescriptArray,
                                this.defTaxonomyArray,
                                this.qtyDefect
                                );
  }        

}
