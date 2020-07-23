import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import {MatCardModule} from '@angular/material/card';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AuthService } from './auth/auth.service';
import { DbhelpService } from './service/dbhelp.service';
import { AppRoutingModule } from './app-routing.module';
import { ChatService } from './service/chat.service';

import {MatButtonModule} from '@angular/material/button';




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

import { QuillModule } from 'ngx-quill';
import { FipDiscrimComponent } from './pages/fip-discrim/fip-discrim.component';
import { RankingfipComponent } from './pages/rankingfip/rankingfip.component';
import { FipResultsComponent } from './pages/fip-results/fip-results.component';
import { ArtefatonamerPipe } from './artefatonamer.pipe';
import { ArtefatoconferePipe } from './artefatoconfere.pipe';
import { FipTaxaddComponent } from './pages/fip-taxadd/fip-taxadd.component';
import { RankingComponent } from './ranking/ranking.component';
import { ChatComponent } from './chat/chat.component';
import { DataSharingService } from './service/datasharing.service';

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
    FipDetectionComponent,
    FipDiscrimComponent,
    RankingfipComponent,
    FipResultsComponent,
    ArtefatonamerPipe,
    ArtefatoconferePipe,
    FipTaxaddComponent,
    RankingComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    NgbModule.forRoot(),
    QuillModule

  ],
  providers: [
  	Title,
    AuthService,
    ApiService,
    DatePipe,
    DbhelpService,
    ChatService,
    DataSharingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
