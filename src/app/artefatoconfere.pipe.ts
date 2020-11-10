import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from './core/api.service';
import { DbhelpService } from './service/dbhelp.service';


@Pipe({
  name: 'artefatoconfere'
})
export class ArtefatoconferePipe implements PipeTransform {
	 constructor(private api: ApiService, private dbhelp: DbhelpService) {}

  transform(value: string, taxonomyarray: Array<string>, position: number): any {

   return this.dbhelp._getArtefatoByUse(value).then(res=>{
      if (taxonomyarray[position] == res[0].defecttaxonomy[position]){
      	console.log(taxonomyarray[position]);
      	console.log(res[0].defecttaxonomy[position]);
        return "Correct";
      } else return "Wrong";
    })


  }

}
