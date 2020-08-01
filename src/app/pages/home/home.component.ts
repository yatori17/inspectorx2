// src/app/pages/home/home.component.ts
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationStart } from '@angular/router';
import { ApiService } from './../../core/api.service';
import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import {ListuserModel } from './../../core/models/listuser.model';
import { DbhelpService } from './../../service/dbhelp.service';
import {ChatService } from './../../service/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  pageTitle = 'InspectorX2';
  loading: boolean;
  error: boolean;
  query: '';
  ListuserSub: Subscription;
  UserSub: Subscription;
  User: ListuserModel;
  access: boolean = false;

  constructor(
    private title: Title,
    private api: ApiService,
    private router: Router,
    public auth: AuthService,
    private db: DbhelpService,
    ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    if(this.auth.loggedIn){
      this.db._getUserById(this.auth.userProfile.sub).then(res=>{
          this.User = this.db.ListuserModelo;
          if(!this.db.ListuserModelo._id){ this._addUser();}
      })
    }
  }
  show(){
    this.access = !this.access;
  }


  public getUser(id: string){
    this.UserSub= this.api.getUserById$(id).subscribe(
        res=>{
          this.User = res;
          if(!res.userId){ this._addUser()}
        },err =>{ console.log(err)}
      );
    }

  private _addUser() {
      return new Promise(resolve => {
     const listuserModelo = new ListuserModel(
      this.auth.userProfile.sub,
      this.auth.userProfile.name
      );
    this.ListuserSub = this.api
      .postUsuarioOnline$(listuserModelo)
      .subscribe(
        res => {
          this.User = res;
          resolve(this.User);
        },
        err => {
          console.log(err);
          }
        );
      });
  }


  ngOnDestroy() {
    if(this.UserSub) this.UserSub.unsubscribe();
    if(this.ListuserSub)this.ListuserSub.unsubscribe();
  }

}
