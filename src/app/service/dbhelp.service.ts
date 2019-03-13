import { Injectable } from '@angular/core';
import { ArtefatoModel } from './../core/models/artefato.model';
import { PartfipModel } from './../core/models/partfip.model';
import { ListuserModel } from './../core/models/listuser.model';
import { RespfipModel } from './../core/models/respfip.model';
import { TaxonomiaModel } from './../core/models/taxonomia.model';
import { Subscription } from 'rxjs/Subscription';

import { ApiService } from './../core/api.service';

@Injectable()
export class DbhelpService {
myBool: boolean;
  loading: boolean;
  error: boolean;

  ArtefatoSub: Subscription;
  ArtefatoList: ArtefatoModel[];
  ArtefatoModelo: ArtefatoModel;

  PartfipSub: Subscription;
  PartfipList: PartfipModel[];
  PartfipModelo: PartfipModel;

  ListuserSub: Subscription;
  ListuserList: ListuserModel[];
  ListuserModelo: ListuserModel;

  RespfipSub: Subscription;
  RespfipList: RespfipModel[];
  RespfipModelo: RespfipModel;

  TaxonomiaSub: Subscription;
  TaxonomiaList: TaxonomiaModel[];
  TaxonomiaModelo: TaxonomiaModel;


  constructor(private api: ApiService) {  }

//GET SIMPLES
  _getArtefato() {
    return new Promise(resolve => {
        this.loading = true;

        this.ArtefatoSub = this.api.getArtefato$().subscribe(
          res => {
        this.ArtefatoList = res;
            this.loading = false;
            resolve(this.ArtefatoList);

          },
          err => {
            console.error(err);
            this.loading = false;
            this.error = true;
          }
          );
      });
    }

   _getPartfip() {
    return new Promise(resolve => {
	    this.loading = true;
	    this.PartfipSub = this.api.getPartfip$().subscribe(
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

   _getListuser() {
    return new Promise(resolve => {
        this.loading = true;
        this.ListuserSub = this.api.getUsuarioOnline$().subscribe(
        	res => {
        		this.ListuserList = res;
            	this.loading = false;
            	resolve(this.ListuserList);
          },
          	err => {
            	console.error(err);
            	this.loading = false;
            	this.error = true;
          }
        );
      });
    }

    _getArtefatoByUse(id: string) {
      console.log(id);
      return new Promise<ArtefatoModel[]>(resolve => {
        console.log('iniciou artefatobyid');
        this.loading = true;
        this.ArtefatoSub = this.api.getArtefatoById$(id).subscribe(
        res => {
          this.ArtefatoList = res;
          this.loading = false;
          resolve(this.ArtefatoList);
          console.log(this.ArtefatoList);
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  });
  }

  _getTaxonomiaById(id: string) {
      console.log(id);
      return new Promise<TaxonomiaModel[]>(resolve => {
        console.log('iniciou taxonomiabyid');
        this.loading = true;
        this.TaxonomiaSub = this.api.getTaxonomiaById$(id).subscribe(
        res => {
          this.TaxonomiaList = res;
          this.loading = false;
          resolve(this.TaxonomiaList);
          console.log(this.TaxonomiaList);
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  });
  }

   _getTaxonomia() {
    return new Promise(resolve => {
        this.loading = true;
        this.TaxonomiaSub = this.api.getTaxonomia$().subscribe(
          res => {
            this.TaxonomiaList = res;
              this.loading = false;
              resolve(this.TaxonomiaList);
          },
            err => {
              console.error(err);
              this.loading = false;
              this.error = true;
          }
        );
      });
    }

    _getPartfipBy_User(user: string) {
    return new Promise(resolve => {
    console.log('iniciou partfip');
    this.loading = true;

    this.PartfipSub = this.api.getDiscrimPartfip$(user).subscribe(
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

    _getPartfipById(partida: string) {
    return new Promise(resolve => {
    console.log('iniciou partfipbyid');
    this.loading = true;

    this.PartfipSub = this.api.getPartfipById$(partida).subscribe(
          res => {
        this.PartfipList = res;
            this.loading = false;
            console.log('vai pro resolve partfipbyid');
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

   _getRespfipBy_Partida(partida: string) {
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

   _getRespfipBy_User_Partida(user: string, partida: string) {
    return new Promise<RespfipModel[]>(resolve => {
    	this.loading = true;
	    this.RespfipSub = this.api.getRespfipById$(user, partida).subscribe(
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

    _getRespfipBy_Partida_Artefato(partida: string, artefato: string, inspector: boolean) {
    return new Promise<RespfipModel[]>(resolve => {
    	this.loading = true;
	    this.RespfipSub = this.api.getRespfipByPartida_Artefato$(partida, artefato, inspector).subscribe(
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





//CREATE
   _createArtefato(userId: string, title: string, taxid: string, content: string, defectbool: Array<boolean>, defectdescript: Array<string>, defecttaxonomy: Array<string>, qtydefect: number) {
    return new Promise(resolve => {
		const artefatoModelo = new ArtefatoModel(
        	userId,
        	title,
          taxid,
	        content,
    	    defectbool,
        	defectdescript,
        	defecttaxonomy,
          qtydefect
    	);

    this.ArtefatoSub = this.api.postArtefato$(artefatoModelo).subscribe(
    	    res => {
        	},
        	err => {
          		console.log(err);
        	}
   		);
  	});
   }

   _createPartfip(userId: string, title: string, modo: number, artefato: Array<string>, inspetor: Array<string>) {
    return new Promise(resolve => {
		const partfipModelo = new PartfipModel(
	        userId,
	        title,
	        modo,
	        artefato,
	        inspetor
	    );

    this.PartfipSub = this.api.postPartfip$(partfipModelo).subscribe(
      		res => {
           },
        	err => {
          		console.log(err);
           }
        );
    });
   }

   _createRespfip(userId: string, partidaId: string, artefatoId: string, comment: string, detbool: Array<boolean>, detdescript: Array<string>, dettaxonomy: Array<string>, inspector: boolean, artefatotitle: string,) {
    return new Promise(resolve => {
		const respfipModelo = new RespfipModel(
      		userId,
      		partidaId,
      		artefatoId,
      		comment,
      		detbool,
      		detdescript,
      		dettaxonomy,
      		inspector,
      		artefatotitle,
    	);

    this.RespfipSub = this.api.postRespfip$(respfipModelo).subscribe(
    	    res => {
	       },
    	    err => {
        		console.log(err);
       	   }
     	);
	});
   }

   _createTaxonomia(title: string, value: Array<any>) {
     console.log(title);
     console.log(value);
    return new Promise(resolve => {
    const taxonomiaModelo = new TaxonomiaModel(
          title,
          value
      );

    this.TaxonomiaSub = this.api.postTaxonomia$(taxonomiaModelo).subscribe(
          res => {
         },
          err => {
            console.log(err);
            }
       );
  });
   }

}
