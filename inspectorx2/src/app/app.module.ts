import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AuthService } from './auth/auth.service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { ApiService } from './core/api.service';
import { LoadingComponent } from './core/loading.component';
import { DatePipe } from '@angular/common';
import { UtilsService } from './core/utils.service';
import { FilterSortService } from './core/filter-sort.service';
import { GamelogicComponent } from './gamelogic/gamelogic.component';
import { GameComponent } from './pages/game/game.component';
import { LinebreakerPipe } from './linebreaker.pipe';
import { EscapeHtmlPipe } from './escape-html.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CallbackComponent,
    LoadingComponent,
    GamelogicComponent,
    GameComponent,
    LinebreakerPipe,
    EscapeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
  	Title,
    AuthService,
    ApiService,
    DatePipe,
    UtilsService,
    FilterSortService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
