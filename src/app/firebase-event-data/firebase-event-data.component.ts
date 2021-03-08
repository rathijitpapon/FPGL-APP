import {Component, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FirebaseDataServiceService} from '../services/firebase-data-service.service';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {EventUserDataComponent} from './event-user-data/event-user-data.component';

@Component({
  providers: [
    EventUserDataComponent,
  ],
  selector: 'app-firebase-event-data',
  templateUrl: './firebase-event-data.component.html',
  styleUrls: ['./firebase-event-data.component.css']
})
export class FirebaseEventDataComponent implements OnInit {

  @ViewChild(EventUserDataComponent) eventUserData!: EventUserDataComponent;

  options: any;
  legend: any = true;
  chartType: any;
  labels: any;
  isShown: any[] = [];
  selectedCharts: any;
  selectedEvent = 'first_open';

  chartsArray: any[] = [
    'User Data',
  ];

  eventsArray: any[] = [
    'first_open',
  ];

  allSelected = false;

  @ViewChild('mySel') skillSel!: MatSelect;

  selectedTimeSpan = [1, 0];
  timeSpans = [
    'Today',
    'Yesterday',
    'This Week',
    'Last Week',
    'Last 7 days',
    'Last 28 days',
    'Last 30 days',
    'Last 90 days',
    'Last 12 Months',
  ];

  numericalValuesOfTimeSpans = [
    [1, 0], [2, 1], [7, 0], [14, 7], [28, 0], [30, 0], [90, 0], [365, 0]
  ];
  selectedVersions = [];
  selectedAppVersions: any;

  constructor(public firebaseService: FirebaseDataServiceService) {
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
    if (this.selectedTimeSpan === undefined) {
      return alert(`time span must be selected`);
    }
    this.selectedAppVersions = (this.selectedVersions.length === 0) ? 0 : this.selectedVersions;

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
