import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DbhelpService } from '../../service/dbhelp.service';
import {ArtefatoModel} from '../../core/models/artefato.model'
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {TaxonomiaModel} from '../../core/models/taxonomia.model';
import { SplitArtifactService } from './../../service/split-artifact.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-artifact',
  templateUrl: './manage-artifact.component.html',
  styleUrls: ['./manage-artifact.component.scss'],
  providers: [SplitArtifactService, DbhelpService]
})
export class ManageArtifactComponent implements OnInit {

  ArtifactArray: ArtefatoModel[]=[];
  form: FormGroup;
  Artifact: ArtefatoModel;
  TaxonomyArray: TaxonomiaModel[]=[];
  Taxonomy: TaxonomiaModel;
  contentValue: string;
  TaxonomiaList: any;
  defLine: Array<string>=[];
  linearray: Array<boolean> = [];
  defDescriptArray: Array<string> = [];
  defTaxonomyArray: Array<string> = [];
  types: Array<any>;
  adicionardefeitoativado: boolean = false;
  taxvalue: string;
  qtyDefect: number;
  taxselected: any;
  description: String = '';
  edited :boolean;
  index=-1;

  constructor(private db: DbhelpService,
              public modalService: NgbModal,
              private fb: FormBuilder,
              private service: SplitArtifactService,
              private sanitizer: DomSanitizer,
              private router: Router
    ) {
      this.form = this.fb.group({
        published: true,
        title: new FormControl(' '),
        taxonomy: this.fb.control('',Validators.required),
        contentValue: this.fb.control('',Validators.required)
      });
     }



  ngOnInit() {



    this.db._getArtefato().then(
      res=> {
        this.ArtifactArray = this.db.ArtefatoList;
      }
    )
    this.db._getTaxonomia().then(
      res =>{
        this.TaxonomyArray =  this.db.TaxonomiaList;
      }
    )
  }
  open(content,i){
    this.defLine=[];
    this.defDescriptArray=[];
    this.defTaxonomyArray=[];
    this.index=i;
    this.fillForm(i);
    this.modalService.open(content);
  }
  openA(content1,i){
    this.modalService.open(content1);
    this.index =i;
    this.Artifact = this.ArtifactArray[i];
  }

  findTaxonomy(id){
    for(let taxs of this.TaxonomyArray){
      if(id === taxs._id){
        this.Taxonomy = taxs;
        return 1;
      }
    }
    return -1;
  }

  fillForm(i){

    this.form.controls.title.setValue(this.ArtifactArray[i].title)
    this.Artifact = this.ArtifactArray[i];
    console.log("Artafto ", this.Artifact)
    if(this.findTaxonomy(this.ArtifactArray[i].taxid) > 0 ){
      this.form.controls.taxonomy.setValue(this.Taxonomy.title)
    }
    this.form.controls.contentValue.setValue(this.ArtifactArray[i].content);
  }

  trackByFn(index: any, item: any) {
    return index;
 }

 onSubmit(){

   console.log(this.form.get('title').value)
   var Artefato =new ArtefatoModel(this.Artifact.userId,
    this.form.controls.title.value,
    this.Artifact.taxid,
    this.Artifact.content,
    this.Artifact.defectbool,
    this.Artifact.defectdescript,
    this.Artifact.defecttaxonomy,
    this.Artifact.qtydefect

    );
  if(this.changeTaxonomy() === 0 && !this.edited){

    this.db._editArtifactById(this.Artifact._id, Artefato);
  }
  else{
    this.qtyDefect = 0;
    for(var _i = 0; _i < this.defLine.length; _i++){
      if (this.linearray[_i] == false){
        this.defDescriptArray[_i] = null;
        this.defTaxonomyArray[_i] = null;
      } else {
        this.qtyDefect++;
      }
    }
    Artefato.content = this.form.controls.contentValue.value;
    Artefato.qtydefect = this.qtyDefect;
    Artefato.taxid = this.Taxonomy._id;
    Artefato.defectbool = this.linearray;
    Artefato.defectdescript = this.defDescriptArray;
    Artefato.defecttaxonomy = this.defTaxonomyArray;
    Artefato._id= this.Artifact._id;
    this.db._editArtifactById(this.Artifact._id, Artefato);
    this.edited = false;
 }
 if(this.index >= 0){
  this.ArtifactArray[this.index] = Artefato;
   this.form.reset();

 }
}

 deleteArtifact(){
   this.db._deleteArtifactById(this.Artifact._id);
   if(this.index > -1) this.ArtifactArray.splice(this.index,1);
 }

 changeTaxonomy(){
   if(this.Taxonomy.title !== this.form.controls.taxonomy.value){
     for(let taxs of this.TaxonomyArray){
       if(taxs.title === this.form.controls.taxonomy.value ){
         this.Taxonomy = taxs;
         console.log("Taxonomia", taxs)
         return 1;
       }
     }

   }
   return 0;
 }

 button(){

  this.edited = true;
  this.changeTaxonomy();
  this.adicionardefeitoativado = true;
  this.defLine = this.service.splitartifact(this.form.controls.contentValue.value);
  this.linearray = [];
  this.defDescriptArray = [];
  this.defTaxonomyArray = [];
  for(var _i = 0; _i < this.defLine.length; _i++){
    this.linearray.push(false);
    this.defDescriptArray.push(null);
    this.defTaxonomyArray.push(null);
  }
}
public descript(content){
  const result = this.Taxonomy.value.find( value => value.display === content).description;


  this.description = result;
  console.log(this.description)
}
private HTMLSanitizer(code: string) {
  return this.sanitizer.bypassSecurityTrustHtml(code);
}



}
