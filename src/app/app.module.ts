import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule } from '@angular/router';
import { CtrComponent } from './ctr/ctr.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CtrService } from './services/ctr-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ZippyComponent } from './zippy/zippy.component';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { GamesComponent } from './games/games.component';
import { GameLatestCtrComponent } from './game-latest-ctr/game-latest-ctr.component';
import { CtrOnGamesComponent } from './ctr-on-games/ctr-on-games.component';
import { DomainsComponent } from './domains/domains.component';
import { AdCompletionComponent } from './ad-completion/ad-completion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomepageComponent,
    CtrComponent,
    ContactComponent,
    ZippyComponent,
    BarChartComponent,
    GamesComponent,
    GameLatestCtrComponent,
    CtrOnGamesComponent,
    DomainsComponent,
    AdCompletionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    LayoutModule,
    ChartsModule,
    RouterModule.forRoot([
      {
        path: '', component: HomepageComponent
      },
      {
        path: 'adcompletion/:name', component: AdCompletionComponent
      },
      {
        path: 'otherctr/:name', component: GameLatestCtrComponent
      },
      {
        path: 'thisctr/:name', component: CtrOnGamesComponent
      },
      {
        path: 'games', component: GamesComponent
      },
      {
        path: 'domains', component: DomainsComponent
      },
      {
        path: 'dinobattlegp2012', component: CtrComponent
      },
      {
        path: 'contact', component: ContactComponent
      },
      {
        path: '**', component: HomepageComponent
      }
    ])
  ],
  providers: [
    CtrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
