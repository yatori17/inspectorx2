// src/app/core/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { ENV } from './env.config';
import { EventModel } from './models/event.model';
import { RsvpModel } from './models/rsvp.model';
import { QuestionModel } from './models/question.model';
import { PartidaModel } from './models/partida.model';
import { RespostaModel } from './models/resposta.model';
import { ArtefatoModel } from './models/artefato.model';
import { TaxonomiaModel } from './models/taxonomia.model';
import { ListuserModel } from './models/listuser.model';
import { PartfipModel } from './models/partfip.model';
import { RespfipModel } from './models/respfip.model';
import { ConferefipModel } from './models/conferefip.model';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private auth: AuthService) { }

  private get _authHeader(): string {
    return `Bearer ${localStorage.getItem('access_token')}`;
  }


  // GET list of questions
  getQuestions$(): Observable<QuestionModel[]> {
    return this.http
      .get(`${ENV.BASE_API}questions`)
      .pipe(
        catchError((error) => this._handleError(error))
        );
  }

  // GET list of ALL partidas
  getPartidas$(): Observable<PartidaModel[]> {
    return this.http
      .get(`${ENV.BASE_API}partidas`)
      .pipe(
        catchError((error) => this._handleError(error))
        );
  }


  // POST partida
  postPartida$(partida: PartidaModel): Observable<PartidaModel> {
    console.log('apiservice: ');
    console.log(partida);
    return this.http
      .post<PartidaModel>(`${ENV.BASE_API}partidas/new`, partida, {
            headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
        );
      }

  // POST resposta
  postResposta$(resposta: RespostaModel): Observable<RespostaModel> {
    console.log('resposta service: ');
    console.log(resposta);
    return this.http
      .post<PartidaModel>(`${ENV.BASE_API}respostas`, resposta, {
            headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
        );
      }

// GET resposta
  getResposta$(idPartida: string): Observable<RespostaModel[]> {
    return this.http
      .get(`${ENV.BASE_API}listarespostas/${idPartida}`)
      .pipe(
        catchError((error) => this._handleError(error))
        );
  }



      //FIP

        // POST artefato
  postArtefato$(artefato: ArtefatoModel): Observable<ArtefatoModel> {
    console.log('artefato post: ');
    console.log(artefato);
    return this.http
      .post<ArtefatoModel>(`${ENV.BASE_API}artefatos/new`, artefato, {
            headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
        );
      }

        // POST usuarioonline
  postUsuarioOnline$(listuser: ListuserModel): Observable<ListuserModel> {
    console.log('listuser post: ');
    console.log(listuser);
    return this.http
      .post<ArtefatoModel>(`${ENV.BASE_API}listusers/new`, listuser, {
            headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
        );
      }


       // REMOVE usuarioonline
  removeUsuarioOnline$(listuser: ListuserModel): Observable<ListuserModel> {
    console.log('listuser del: ');
    console.log(listuser);
    return this.http
      .post<ArtefatoModel>(`${ENV.BASE_API}listusers/del/${listuser.userId}`, listuser, {
            headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
        );
      }

       // POST partfip
  postPartfip$(partfip: PartfipModel): Observable<PartfipModel> {
    console.log('partfip post: ');
    console.log(partfip);
    return this.http
      .post<PartfipModel>(`${ENV.BASE_API}partfip/new`, partfip, {
            headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
        );
      }

    // POST respfip
  postRespfip$(respfip: RespfipModel): Observable<RespfipModel> {
    console.log('respfip post: ');
    console.log(respfip);
    return this.http
      .post<RespfipModel>(`${ENV.BASE_API}respfip/new`, respfip, {
            headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
        );
      }


    // POST respfip
  postConferefip$(conferefip: ConferefipModel): Observable<ConferefipModel> {
    console.log('conferefip post: ');
    console.log(conferefip);
    return this.http
      .post<RespfipModel>(`${ENV.BASE_API}conferefip/new`, conferefip, {
            headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
        );
      }

  //POST taxonomia
  postTaxonomia$(taxonomia: TaxonomiaModel): Observable<TaxonomiaModel> {
    console.log('taxonomia post: ');
    console.log(taxonomia);
    return this.http
      .post<TaxonomiaModel>(`${ENV.BASE_API}taxonomia/new`, taxonomia, {
            headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
        );
      }


        //GET artefato
        getArtefato$(): Observable<ArtefatoModel[]> {
          return this.http
            .get(`${ENV.BASE_API}artefatos`)
            .pipe(
              catchError((error) => this._handleError(error))
              );
        }


        //GET usuario
  getUsuarioOnline$(): Observable<ListuserModel[]> {
    return this.http
      .get(`${ENV.BASE_API}listusers`)
      .pipe(
        catchError((error) => this._handleError(error))
        );
  }




        //GET partfip
  getPartfip$(): Observable<PartfipModel[]> {
    return this.http
      .get(`${ENV.BASE_API}partfip`)
      .pipe(
        catchError((error) => this._handleError(error))
        );
  }

  //GET partfip
  getPartfipById$(id: string): Observable<PartfipModel[]> {
    return this.http
      .get(`${ENV.BASE_API}partfips/${id}`)
      .pipe(
        catchError((error) => this._handleError(error))
        );
  }

  // GET artefato baseado no ID
  getArtefatoById$(id: string): Observable<ArtefatoModel[]> {
    return this.http
      .get(`${ENV.BASE_API}artefatos/${id}`)
      .pipe(
        catchError((error) => this._handleError(error))
        );
  }

    // GET respfip baseado no ID
  getRespfipById$(user: string, partida: string): Observable<RespfipModel[]> {
    return this.http
      .get(`${ENV.BASE_API}respfip/${user}/${partida}`)
      .pipe(
        catchError((error) => this._handleError(error))
        );
  }

      // GET respfip baseado no ID
  getRespfipByPartida_Artefato$(partida: string, artefato: string, inspector: boolean): Observable<RespfipModel[]> {
    return this.http
      .get(`${ENV.BASE_API}respfips/${partida}/${artefato}/${inspector}`)
      .pipe(
        catchError((error) => this._handleError(error))
        );
  }

        //GET discrimpartfip
  getDiscrimPartfip$(userid: string): Observable<PartfipModel[]> {
    return this.http
      .get(`${ENV.BASE_API}partfip/${userid}`)
      .pipe(
        catchError((error) => this._handleError(error))
        );
  }

    getDiscrimRespfipById$(partida: string): Observable<RespfipModel[]> {
    return this.http
      .get(`${ENV.BASE_API}respfipdiscrim/${partida}`)
      .pipe(
        catchError((error) => this._handleError(error))
        );
  }

      // GET respfip baseado no ID
  getConferefipById$(user: string, partida: string): Observable<ConferefipModel[]> {
    return this.http
      .get(`${ENV.BASE_API}conferefip/${user}/${partida}`)
      .pipe(
        catchError((error) => this._handleError(error))
        );
  }

    // GET taxonomia
  getTaxonomia$(): Observable<TaxonomiaModel[]> {
    return this.http
      .get(`${ENV.BASE_API}taxonomia/`)
      .pipe(
        catchError((error) => this._handleError(error))
        );
  }

    // GET taxonomia baseado no ID
  getTaxonomiaById$(id: string): Observable<TaxonomiaModel[]> {
    return this.http
      .get(`${ENV.BASE_API}taxonomia/${id}`)
      .pipe(
        catchError((error) => this._handleError(error))
        );
  }

  // ????


  // ????

  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    if (err.message && err.message.indexOf('No JWT present') > -1) {
      this.auth.login();
    }
    return Observable.throw(errorMsg);
  }

}
