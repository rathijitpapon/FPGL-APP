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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ZippyComponent } from './zippy/zippy.component';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { GamesComponent } from './games/games.component';
import { GameLatestCtrComponent } from './game-latest-ctr/game-latest-ctr.component';
import { CtrOnGamesComponent } from './ctr-on-games/ctr-on-games.component';
import { DomainsComponent } from './domains/domains.component';
import { AdCompletionComponent } from './ad-completion/ad-completion.component';
import { CtrWithRespectToSourceComponent } from './ctr-with-respect-to-source/ctr-with-respect-to-source.component';
import { SourceSinkComponent } from './source-sink/source-sink.component';
import { BucksStatusComponent } from './bucks-status/bucks-status.component';
import {SourceSinkService} from './services/source-sink.service';
import {InterceptorService} from './loader/interceptor.service';
import { BucksSpendAndEarningComponent } from './bucks-status/bucks-spend-and-earning/bucks-spend-and-earning.component';
import { DrawingChartComponent } from './drawing-chart/drawing-chart.component';
import { AverageBucksComponent } from './bucks-status/average-bucks/average-bucks.component';
import { AverageCumulativeBucksComponent } from './bucks-status/average-cumulative-bucks/average-cumulative-bucks.component';
import { AverageAdshowSourceComponent } from './bucks-status/average-adshow-source/average-adshow-source.component';
import {SumOfBucksSpendEarningComponent} from './bucks-status/sum-of-bucks-spend-earning/sum-of-bucks-spend-earning.component';
import { AverageAdshowCompletionSourceComponent } from './bucks-status/average-adshow-completion-source/average-adshow-completion-source.component';
import { FirebaseEventDataComponent } from './firebase-event-data/firebase-event-data.component';
import { FirebaseDataServiceService } from './services/firebase-data-service.service';
import { EventUserDataComponent } from './firebase-event-data/event-user-data/event-user-data.component';
import { FirebaseIphoneEventDataComponent } from './firebase-iphone-event-data/firebase-iphone-event-data.component';
import { IphoneEventDataComponent } from './firebase-iphone-event-data/iphone-event-data/iphone-event-data.component';
import { FirebaseIphoneDataServiceService } from './services/firebase-iphone-data-service.service';

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
    AdCompletionComponent,
    CtrWithRespectToSourceComponent,
    SourceSinkComponent,
    BucksStatusComponent,
    BucksSpendAndEarningComponent,
    DrawingChartComponent,
    AverageBucksComponent,
    AverageCumulativeBucksComponent,
    AverageAdshowSourceComponent,
    SumOfBucksSpendEarningComponent,
    AverageAdshowCompletionSourceComponent,
    FirebaseEventDataComponent,
    EventUserDataComponent,
    FirebaseIphoneEventDataComponent,
    IphoneEventDataComponent
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
        path: 'firebase/funvai', component: FirebaseEventDataComponent
      },
      {
        path: 'firebase/iphone', component: FirebaseIphoneEventDataComponent
      },
      {
        path: 'sourceSink', component: SourceSinkComponent
      },
      {
        path: 'sourceSink/bucksStatus', component: BucksStatusComponent
      },
      {
        path: 'sourceSink/bucksSpendAndEarning', component: BucksSpendAndEarningComponent
      },
      {
        path: 'ctrwrtsrc/:name', component: CtrWithRespectToSourceComponent
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
    {
      provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
    },
    CtrService,
    SourceSinkService,
    FirebaseDataServiceService,
    FirebaseIphoneDataServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
