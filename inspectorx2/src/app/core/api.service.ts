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
        catchError((error)=> this._handleError(error))
        );
  }

  // GET list of partidas
  getPartidas$(): Observable<PartidaModel[]> {
    return this.http
      .get(`${ENV.BASE_API}partidas`)
      .pipe(
        catchError((error)=> this._handleError(error))
        );
  }


  // POST partida
  postPartida$(partida: PartidaModel): Observable<PartidaModel> {
  //  console.log('apiservice: ');
   // console.log(partida);
    return this.http
      .post<PartidaModel>(`${ENV.BASE_API}partidas/new`, partida, {
            headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
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