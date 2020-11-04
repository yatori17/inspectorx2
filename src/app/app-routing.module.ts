import { NgModule } from '@angular/core';import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { GameComponent } from './pages/game/game.component';
import { CrawlerDifComponent } from './pages/crawler-dif/crawler-dif.component';
import { FullinspecComponent } from './pages/fullinspec/fullinspec.component';
import { CrawlendComponent } from './pages/crawlend/crawlend.component';
import { FipPlanComponent } from './pages/fip-plan/fip-plan.component';
import { FipAddComponent } from './pages/fip-add/fip-add.component';
import { FipTaxaddComponent } from './pages/fip-taxadd/fip-taxadd.component';
import { FipCreateComponent } from './pages/fip-create/fip-create.component';
import { FipDetectionComponent } from './pages/fip-detection/fip-detection.component';
import { FipDiscrimComponent } from './pages/fip-discrim/fip-discrim.component';
import { FipResultsComponent } from './pages/fip-results/fip-results.component';
import { RankingfipComponent } from './pages/rankingfip/rankingfip.component';

import { PartidasComponent } from './pages/partidas/partidas.component';
import { FipDiscrimInspComponent } from './pages/fip-discrim-insp/fip-discrim-insp.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ManagerComponent } from './pages/manager/manager.component';
import { ManageArtifactComponent } from './pages/manage-artifact/manage-artifact.component';




const routes: Routes = [{
	path: '',
	component: HomeComponent
},
{
	path: 'callback',
	component: CallbackComponent
},
{
	path:'profile',
	component: ProfileComponent
},
{
	path: 'game/:modoinsp/:id/:id2/:id3',
	component: GameComponent
},
{
	path: 'crawler-dif',
	component: CrawlerDifComponent
},
{
	path: 'fullinspec',
	component: FullinspecComponent
},
{
	path: 'crawlend/:id/:id2',
	component: CrawlendComponent
},
{
	path: 'fipplan',
	component: FipPlanComponent
},
{
	path: 'fipplan/add',
	component: FipAddComponent
},
{
  path: 'fipplan/manager',
  component: ManagerComponent
},
{
  path: 'fipplan/artifactmanager',
  component: ManageArtifactComponent
},

{
	path: 'fipplan/taxadd',
	component: FipTaxaddComponent
},
{
	path: 'fipcreate',
	component: FipCreateComponent
},
{
	path: 'fipdetect',
	component: FipDetectionComponent
},
{
	path: 'fipdiscrim',
	component: FipDiscrimComponent
},
{
  path: 'fipdiscriminsp',
  component: FipDiscrimInspComponent
},
{
	path: 'fipresults/:id',
	component: FipResultsComponent
},
{
	path: 'partidas',
	component: PartidasComponent
},
{
	path: 'testbench',
	component: RankingfipComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
