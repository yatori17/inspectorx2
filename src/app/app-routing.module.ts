import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { GameComponent } from './pages/game/game.component';
import { CrawlerDifComponent } from './pages/crawler-dif/crawler-dif.component';
import { FullinspecComponent } from './pages/fullinspec/fullinspec.component';
import { CrawlendComponent } from './pages/crawlend/crawlend.component';
import { FipPlanComponent } from './pages/fip-plan/fip-plan.component';
import { FipAddComponent } from './pages/fip-add/fip-add.component';


const routes: Routes = [{
	path: '',
	component: HomeComponent
},
{
	path:'callback',
	component: CallbackComponent
},
{
	path:'game/:id/:id2/:id3',
	component: GameComponent
},
{
	path:'crawler-dif',
	component: CrawlerDifComponent
},
{
	path:'fullinspec',
	component: FullinspecComponent
},
{
	path: "crawlend/:id",
	component: CrawlendComponent
},
{
	path: "fipplan",
	component: FipPlanComponent
},
{
	path: "fipplan/add",
	component: FipAddComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
