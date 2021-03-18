import {Component, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FirebaseDataServiceService} from '../services/firebase-data-service.service';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';

@Component({
  selector: 'app-firebase-funvai-revenue',
  templateUrl: './firebase-funvai-revenue.component.html',
  styleUrls: ['./firebase-funvai-revenue.component.css']
})
export class FirebaseFunvaiRevenueComponent implements OnInit {

  options: any;
  legend: any = true;
  chartType: any;
  labels: any;
  revenueData: any[] = [];
  selectedGames: any[] = [];
  isLoading = false;

  gamesArray: any[] = [];

  allGameSelected = false;

  @ViewChild('chartSel') chartSel!: MatSelect;
  @ViewChild('gameSel') gameSel!: MatSelect;

  selectedTimeSpan = 4;
  timeSpans = [
    'Today',
    'Yesterday',
    'Last 7 Days',
    'Previous 7 Days',
    'Last 28 days',
    'Last 30 days',
    'Last 90 days',
    'Last 12 Months',
  ];

  numericalValuesOfTimeSpans = [
    [1, 0], [2, 1], [7, 0], [14, 7], [28, 0], [30, 0], [90, 0], [365, 0]
  ];

  constructor(public firebaseService: FirebaseDataServiceService) {
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    await this.fetchGames();

    this.revenueData = [];
    this.selectedGames = [0, ...this.gamesArray];
    this.allGameSelected = true;
    await this.fetchData();
  }

  async fetchGames(): Promise<void> {
    this.gamesArray = await this.firebaseService.getGames();
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


  async fetchData(): Promise<any> {
    this.isLoading = true;
    this.revenueData = [];

    if (this.selectedGames.length === 0) {
      return alert(`at least one game must be selected`);
    }

    const startDate = this.numericalValuesOfTimeSpans[this.selectedTimeSpan][0];
    const endDate = this.numericalValuesOfTimeSpans[this.selectedTimeSpan][1];

    let timestamp = new Date();
    timestamp.setDate(timestamp.getDate() - startDate);
    const minDate = timestamp.toISOString().split('T')[0];

    timestamp = new Date();
    timestamp.setDate(timestamp.getDate() - endDate);
    const maxDate = timestamp.toISOString().split('T')[0];

    for (const game of this.selectedGames) {
      if (game !== 0) {
        const data = await this.firebaseService.getRevenueData(game, minDate, maxDate);
        this.revenueData.push({
          minDate,
          maxDate,
          game,
          data
        });
      }
    }

    this.isLoading = false;

  }

}
