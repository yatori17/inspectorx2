import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
//Services
import { AuthService } from './../../auth/auth.service';
import { SplitArtifactService } from './../../service/split-artifact.service';
import { DbhelpService } from './../../service/dbhelp.service';
//rxjs
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
//plugin
import { QuillEditorComponent } from 'ngx-quill';
import * as QuillNamespace from 'quill';
const Quill: any = QuillNamespace;

import {  NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { element } from '@angular/core/src/render3/instructions';
import { Content } from '@angular/compiler/src/render3/r3_ast';


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
  description: String = '';

  constructor(public auth: AuthService,private router:Router, private sanitizer: DomSanitizer, private service: SplitArtifactService,
    private dbhelp: DbhelpService,
    private modalService: NgbModal) { }

  ngOnInit() {

    this.dbhelp._getTaxonomia().then(res=> {
      this.TaxonomiaList = res;
      console.log(this.TaxonomiaList);
    });
  }
  open(content) {
    this.modalService.open(content);
  }

  public changeTaxonomy(){
    this.types = this.taxselected.value;
    console.log(this.types);
  }
  public descript(content){
    //this.description = content.description;
    const result = this.types.find( type => type.display === content).description;

    this.description = result;
    console.log(this.description)
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
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['fipplan/add']);
});
  }


}
