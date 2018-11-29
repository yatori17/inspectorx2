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

import { GamelogicComponent } from './gamelogic/gamelogic.component';
import { GameComponent } from './pages/game/game.component';
import { LinebreakerPipe } from './linebreaker.pipe';
import { EscapeHtmlPipe } from './escape-html.pipe';
import { CrawlerDifComponent } from './pages/crawler-dif/crawler-dif.component';
import { FullinspecComponent } from './pages/fullinspec/fullinspec.component';
import { CrawlendComponent } from './pages/crawlend/crawlend.component';
import { FipPlanComponent } from './pages/fip-plan/fip-plan.component';
import { FipAddComponent } from './pages/fip-add/fip-add.component';
import { PartidasComponent } from './pages/partidas/partidas.component';
import { ReqComponent } from './pages/req/req.component';
import { FipCreateComponent } from './pages/fip-create/fip-create.component';
import { FipDetectionComponent } from './pages/fip-detection/fip-detection.component';

import { QuillModule } from 'ngx-quill'


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
    EscapeHtmlPipe,
    CrawlerDifComponent,
    FullinspecComponent,
    CrawlendComponent,
    FipPlanComponent,
    FipAddComponent,
    PartidasComponent,
    ReqComponent,
    FipCreateComponent,
    FipDetectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    QuillModule
  ],
  providers: [
  	Title,
    AuthService,
    ApiService,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
