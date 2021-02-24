import {AfterViewInit, ChangeDetectorRef, Component, Directive, OnInit, ViewChild} from '@angular/core';
import {SourceSinkService} from '../services/source-sink.service';
import {AverageBucksComponent} from './average-bucks/average-bucks.component';
import {BucksSpendAndEarningComponent} from './bucks-spend-and-earning/bucks-spend-and-earning.component';
import {LoaderService} from '../loader/loader.service';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {SumOfBucksSpendEarningComponent} from './sum-of-bucks-spend-earning/sum-of-bucks-spend-earning.component';
import {AverageAdshowSourceComponent} from './average-adshow-source/average-adshow-source.component';
import {AverageCumulativeBucksComponent} from './average-cumulative-bucks/average-cumulative-bucks.component';
import {AverageAdshowCompletionSourceComponent} from './average-adshow-completion-source/average-adshow-completion-source.component';


@Component({
  providers: [
    AverageBucksComponent,
    BucksSpendAndEarningComponent,
    SumOfBucksSpendEarningComponent,
    AverageAdshowSourceComponent,
    AverageAdshowCompletionSourceComponent,
    AverageCumulativeBucksComponent,
  ],
  selector: 'app-bucks-status',
  templateUrl: './bucks-status.component.html',
  styleUrls: ['./bucks-status.component.css']
})

export class BucksStatusComponent implements OnInit {

  @ViewChild(AverageBucksComponent) averageBucksComponent!: AverageBucksComponent;
  @ViewChild(BucksSpendAndEarningComponent) bucksSpendAndEarningComponent!: BucksSpendAndEarningComponent;
  @ViewChild(SumOfBucksSpendEarningComponent) sumOfBucksSpendEarningComponent!: SumOfBucksSpendEarningComponent;
  @ViewChild(AverageAdshowSourceComponent) averageAdshowSourceComponent!: AverageAdshowSourceComponent;
  @ViewChild(AverageAdshowCompletionSourceComponent) averageAdshowCompletionSourceComponent!: AverageAdshowCompletionSourceComponent;
  @ViewChild(AverageCumulativeBucksComponent) averageCumulativeBucksComponent!: AverageCumulativeBucksComponent;

  games = [
    'dinobattlegp2012',
    'dinowaterworldios',
    'dragonbattle2012',
    'dragoncarefgp',
    'dragoncareios',
    'dragoncastle2012',
    'jseaattackios',
    'jsniper3dfgp',
    'jurassicpixelcraftios',
    'jurassicseagp',
    'policevsthieffgp',
    'policevsthieffios',
    'seamonstergp2012',
    'sharkattackios',
    'sharkworld3dfgp'
  ];

  selectedDatabase: string | undefined;
  previouslySelectedDatabase: string | undefined;
  options: any;
  legend: any = true;
  chartType: any;
  datasets: any;
  labels: any;
  isShown: any[] = [];
  lowerLimitOfBucks = 0;
  upperLimitOfBucks = 300;
  selectedCharts: any;
  chartsArray: any[] = [
    'Average bucks Per Level',
    'Average Earns And Spend Per Level',
    'Average Cumulative Earn And Spend Per Level',
    'Total Earns And Spend Per Level',
    'Average Total Ad Show Per Source',
    'Average Total Reward Ad Show Per Source',
    'Average Total Int Ad Show Per Source',
    'Average Reward Ad Rejection Per Source'
  ];

  allSelected = false;

  @ViewChild('mySel') skillSel!: MatSelect;

  showingVersions = false;
  appVersions: any[] = [];

  seletedTimeSpan = 0;
  timeSpans = [
    'All Data',
    'last 24 hours',
    'last 48 hours',
    'last 7 days',
    'last 28 days'
  ];

  numericalValuesOfTimeSpans = [
    10000000, 24, 48, 168, 672
  ];
  selectedAppVersion: any;

  constructor(public loaderService: LoaderService, public sourceSinkService: SourceSinkService) {
  }

  ngOnInit(): void {
    this.chartsArray.forEach((item, key) => {
      this.isShown[key] = false;
    });
  }

  toggleAllSelection(): void {
    this.allSelected = !this.allSelected;  // to control select-unselect

    if (this.allSelected) {
      this.skillSel.options.forEach((item: MatOption) => item.select());
    } else {
      this.skillSel.options.forEach((item: MatOption) => {
        item.deselect();
      });
    }
    this.skillSel.close();
  }

  fetchVersions(): any {
    this.sourceSinkService.getVersions(this.selectedDatabase).subscribe(
      (param) => {
        // @ts-ignore
        for (const version of param) {
          this.appVersions.push(version);
        }
      });
  }


  fetchData(): any {

    if (this.selectedDatabase === undefined || this.selectedDatabase.length <= 0) {
      return alert(`database must be selected`);
    }
    if (this.upperLimitOfBucks < this.lowerLimitOfBucks) {
      return alert(`upper limit must be greater than lower limit`);
    }
    if (this.seletedTimeSpan === undefined || this.seletedTimeSpan === 0) {
      return alert(`time span must be selected`);
    }

    this.chartsArray.forEach((item, key) => {
      this.isShown[key] = false;
    });

    this.showingVersions = true;

    for (let i = 0; i < this.chartsArray.length; i++) {
      if (this.selectedCharts.includes(this.chartsArray[i])) {
        this.isShown[i] = true;
      }
    }

    // this.fetchVersions();

  }

  fetchDataWRTVersions() {

  }
}
