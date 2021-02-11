import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdCompletionComponent} from './ad-completion/ad-completion.component';
import {GamesComponent} from './games/games.component';

const routes: Routes = [
  {
    path: 'ad_complete/:src', component: GamesComponent
  },
  {
    path: 'ad_completion/:db_name', component: AdCompletionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
