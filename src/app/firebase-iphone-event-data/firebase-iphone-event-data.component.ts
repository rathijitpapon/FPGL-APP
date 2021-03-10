import {Component, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FirebaseIphoneDataServiceService} from '../services/firebase-iphone-data-service.service';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {IphoneEventDataComponent} from './iphone-event-data/iphone-event-data.component';

@Component({
  providers: [
    IphoneEventDataComponent,
  ],
  selector: 'app-firebase-iphone-event-data',
  templateUrl: './firebase-iphone-event-data.component.html',
  styleUrls: ['./firebase-iphone-event-data.component.css']
})
export class FirebaseIphoneEventDataComponent implements OnInit {

  @ViewChild(IphoneEventDataComponent) iphoneEventUserData!: IphoneEventDataComponent;

  options: any;
  legend: any = true;
  chartType: any;
  labels: any;
  isShown: any[] = [];
  selectedCharts: any[] = [];
  selectedEvent = 'first_open';
  selectedGames: any[] = [];

  gamesArray: any[] = [];

  chartsArray: any[] = [
    'New User Data',
    'Active User Data',
  ];

  eventsArray: any[] = [
    'first_open',
    'session_start',
  ];

  allChartSelected = false;
  allGameSelected = false;

  @ViewChild('chartSel') chartSel!: MatSelect;
  @ViewChild('gameSel') gameSel!: MatSelect;

  selectedTimeSpan: any[] = [];
  timeSpans = [
    'Today',
    'Yesterday',
    'This Week',
    'Last Week',
    'Last 28 days',
    'Last 30 days',
    'Last 90 days',
    'Last 12 Months',
  ];

  numericalValuesOfTimeSpans = [
    [1, 0], [2, 1], [7, 0], [14, 7], [28, 0], [30, 0], [90, 0], [365, 0]
  ];

  constructor(public firebaseService: FirebaseIphoneDataServiceService) {
  }

  ngOnInit(): void {
    this.chartsArray.forEach((item, key) => {
      this.isShown[key] = false;
    });

    this.fetchGames();
  }

  async fetchGames(): Promise<void> {
    this.gamesArray = await this.firebaseService.getGames();
  }

  toggleAllChartSelection(): void {
    this.allChartSelected = !this.allChartSelected;  // to control select-unselect

    if (this.allChartSelected) {
      this.chartSel.options.forEach((item: MatOption) => item.select());
    } else {
      this.chartSel.options.forEach((item: MatOption) => {
        item.deselect();
      });
    }
    this.chartSel.close();
  }

  toggleAllGameSelection(): void {
    this.allGameSelected = !this.allGameSelected;  // to control select-unselect

    if (this.allGameSelected) {
      this.gameSel.options.forEach((item: MatOption) => item.select());
    } else {
      this.gameSel.options.forEach((item: MatOption) => {
        item.deselect();
      });
    }
    this.gameSel.close();
  }


  fetchData(): any {
    if (this.selectedTimeSpan.length !== 2) {
      return alert(`time span must be selected`);
    }

    if (this.selectedGames.length === 0) {
      return alert(`at least one game must be selected`);
    }

    if (this.selectedCharts.length === 0) {
      return alert(`at least one chart must be selected`);
    }

    this.chartsArray.forEach((item, key) => {
      this.isShown[key] = false;
    });

    for (let i = 0; i < this.chartsArray.length; i++) {
      if (this.selectedCharts.includes(this.chartsArray[i])) {
        this.isShown[i] = true;
      }
    }
  }


}
