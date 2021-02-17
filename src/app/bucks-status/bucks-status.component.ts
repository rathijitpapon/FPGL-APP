import {AfterViewInit, ChangeDetectorRef, Component, Directive, OnInit, ViewChild} from '@angular/core';
import {SourceSinkService} from '../services/source-sink.service';
import {AverageBucksComponent} from './average-bucks/average-bucks.component';
import {BucksSpendAndEarningComponent} from './bucks-spend-and-earning/bucks-spend-and-earning.component';
import {LoaderService} from '../loader/loader.service';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';


@Component({
  providers: [AverageBucksComponent],
  selector: 'app-bucks-status',
  templateUrl: './bucks-status.component.html',
  styleUrls: ['./bucks-status.component.css']
})

export class BucksStatusComponent implements OnInit {

  @ViewChild(AverageBucksComponent) averageBucksComponent!: AverageBucksComponent;
  @ViewChild(BucksSpendAndEarningComponent) bucksSpendAndEarningComponent!: BucksSpendAndEarningComponent;

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
    'Average Total Ad Show Per Source',
  ];

  allSelected = false;

  @ViewChild('mySel') skillSel!: MatSelect;


  constructor(public loaderService: LoaderService) {
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


  fetchData(): any {
    if (this.selectedDatabase === undefined || this.selectedDatabase.length <= 0) {
      return alert(`database must be selected`);
    }
    if (this.upperLimitOfBucks < this.lowerLimitOfBucks) {
      return alert(`upper limit must be greater than lower limit`);
    }
    this.chartsArray.forEach((item, key) => {
      this.isShown[key] = false;
    });

    for (let i = 0; i < this.chartsArray.length; i++) {
      if (this.selectedCharts.includes(this.chartsArray[i])) {
        this.isShown[i] = true;
      }
    }
    console.log(this.selectedCharts);
    this.averageBucksComponent.fetchData();
    this.bucksSpendAndEarningComponent.fetchData();

  }
}
