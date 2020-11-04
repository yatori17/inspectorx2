import { Component, OnInit } from '@angular/core';
import { DbhelpService } from './../../service/dbhelp.service';
import {AuthService } from './../../auth/auth.service';
import { TaxonomiaModel } from './../../core/models/taxonomia.model';
import { NgbModal ,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder,FormControl, Validators, FormArray } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { Router } from '@angular/router';
import { DISABLED } from '@angular/forms/src/model';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  form: FormGroup;
  constructor(private auth: AuthService,
              private db: DbhelpService,
              private modal: NgbModal,
              private fb: FormBuilder,
              private router: Router
    ) {
    }
  id: string='';
  saveNumber: number;
  aTaxonomy: TaxonomiaModel;
  Taxonomy: Array<TaxonomiaModel> = [{title: " ", value:[{display: " a", description: ""}]}];
  closeResult ='';
  ngOnInit() {
    this.db._getTaxonomia().then(
      res=>{
        this.Taxonomy= this.db.TaxonomiaList;
      }
    );
    this.form = this.fb.group({
      published: true,
      title: this.fb.control('', Validators.required),
      taxonomy: this.fb.control({value: '',disabled:true})
    });
  }
  openA(content1, i) {
    this.aTaxonomy = this.Taxonomy[i];
    this.modal.open(content1);
    this.saveNumber =i;
  }
  open(content, i) {
    this.fillArray(i);
    this.modal.open(content, ).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  fillArray(i){
    this.saveNumber = i;
    this.id = this.Taxonomy[i]._id;
      console.log(this.Taxonomy[i])
    this.form.controls.title.setValue(this.Taxonomy[i].title)
    const taxonomies = this.form.controls.taxonomy as FormArray;
    for(let j of this.Taxonomy[i].value){
      console.log(j)
      taxonomies.push(this.fb.group({
        display: j.display,
        description: j.description
      }));
      console.log(this.form)
    }
  }
  trackByFn(index: any, item: any) {
    return index;
 }



 deleteTaxonomy(){
      this.db._deleteTaxonomyById(this.aTaxonomy._id);
      if(this.saveNumber > -1) this.Taxonomy.splice(this.saveNumber,1);
 }
 onSubmit(){

    console.log(this.form.controls.taxonomy.value)
    this.db._editTaxonomyById(this.id,new TaxonomiaModel(this.form.controls.title.value,
      this.form.controls.taxonomy.value));
    this.Taxonomy[this.saveNumber] = new TaxonomiaModel(this.form.controls.title.value,
      this.form.controls.taxonomy.value);
    const taxonomies = this.form.controls.taxonomy as FormArray;
    while(taxonomies.length) taxonomies.removeAt(0);
 }



  private getDismissReason(reason: any): string {
    const taxonomies = this.form.controls.taxonomy as FormArray;
    while(taxonomies.length) taxonomies.removeAt(0);
    this.form.reset();

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
