import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { DbhelpService } from './../../service/dbhelp.service';


@Component({
  selector: 'app-fip-taxadd',
  templateUrl: './fip-taxadd.component.html',
  styleUrls: ['./fip-taxadd.component.scss']
})
export class FipTaxaddComponent  {
  form: FormGroup;
  titleValue: string;

  constructor(private router: Router, private fb: FormBuilder, private dbhelp: DbhelpService) {
    this.form = this.fb.group({
      published: true,
      taxonomy: this.fb.array([]),
    });
  }

  addCreds() {
    const creds = this.form.controls.taxonomy as FormArray;
    creds.push(this.fb.group({
      display: '',
      description: '',
    }));
  }

  trackByFn(index: any, item: any) {
   return index;
}

	addtoDB(){
		console.log(this.titleValue);
		console.log(this.form.controls.taxonomy.value);
		 this.dbhelp._createTaxonomia(
          this.titleValue,
          this.form.controls.taxonomy.value
          );


    this.router.navigate(['/']);
	}


}
