// src/app/pages/home/home.component.ts
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationStart } from '@angular/router';
import { ApiService } from './../../core/api.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../../auth/auth.service';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  pageTitle = 'Intro';
  loading: boolean;
  error: boolean;
  query: '';

  constructor(
    private title: Title,
    private api: ApiService,
    private router: Router,
    public auth: AuthService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    console.log('Teste');
  }


  ngOnDestroy() {
  }

}
