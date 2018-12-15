import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from './core/api.service';
import { DbhelpService } from './service/dbhelp.service';


@Pipe({
  name: 'artefatonamer',
})
export class ArtefatonamerPipe implements PipeTransform {


  	Results: string;
  constructor(private api: ApiService, private dbhelp: DbhelpService) { }

  transform(value: string) {

    console.log("artefato namer começando")

    return this.dbhelp._getArtefatoByUse(value).then(res => {
      this.Results = res[0].title;
      console.log(this.Results);
      return this.Results
    })
    
  }

}
