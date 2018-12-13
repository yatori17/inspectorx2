import { Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ArtefatoModel } from './core/models/artefato.model';
import { ApiService } from './core/api.service';

@Pipe({
  name: 'artefatonamer'
})
export class ArtefatonamerPipe implements PipeTransform {

	 	myBool: boolean;
  loading: boolean;
  error: boolean;
	ArtefatoIdSub: Subscription;
  ArtefatoIdList: ArtefatoModel[];
  ArtefatoIdModelo: ArtefatoModel;
  	Results: string;
  constructor(private api: ApiService) { }

  transform(value: string): string {
    return value
  }


  public _getArtefatoByUse(id: string){
    console.log(id);
    return new Promise(resolve => {
    console.log("iniciou artefatobyid");
    this.loading = true;

    this.ArtefatoIdSub = this.api.getArtefatoById$(id).subscribe(
      res => {
        this.ArtefatoIdList= res;
   
        this.loading = false;
   
       console.log(this.ArtefatoIdList);
       
       // this.splitsplit();
        
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
