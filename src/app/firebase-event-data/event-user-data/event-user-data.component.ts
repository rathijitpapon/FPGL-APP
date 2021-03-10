import {Component, Input, OnInit} from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';
import { SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';
import { FirebaseDataServiceService } from 'src/app/services/firebase-data-service.service';

@Component({
  selector: 'app-event-user-data',
  templateUrl: './event-user-data.component.html',
  styleUrls: ['./event-user-data.component.css']
})
export class EventUserDataComponent implements OnInit, OnChanges {

  @Input() public eventName: any;
  @Input() public startDate: any;
  @Input() public endDate: any;
  @Input() public game: any;

  options: any;
  legend: any = true;
  chartType: any;
  datasets: any;
  labels: any;
  isShown: any = false;
  barChartPlugins: any = [ChartDataLabels];
  width: any;
  minTime: any;
  maxTime: any;
  userCount = 0;
  eventCount = 0;

  isLoading = false;


  constructor(private firebaseService: FirebaseDataServiceService) {
    Chart.plugins.unregister(ChartDataLabels);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchData();
  }

  ngOnInit(): void {
  }

  async fetchData(): Promise<void> {
    this.datasets = [];
    this.labels = [];
    this.options = {};
    this.isShown = false;
    this.isLoading = true;
    this.userCount = 0;
    this.eventCount = 0;

    let timestamp = new Date();
    timestamp.setDate(timestamp.getDate() - this.startDate);
    const minDate = timestamp.toISOString().split('T')[0];

    timestamp = new Date();
    timestamp.setDate(timestamp.getDate() - this.endDate);
    const maxDate = timestamp.toISOString().split('T')[0];

    const data = await this.firebaseService.getEventUserData(
      this.eventName,
      this.game,
      minDate,
      maxDate,
    );

    const userCount = [];
    for (const value of data) {
      this.labels.push(value.date);
      userCount.push(value.newUsers);

      this.userCount += +value.newUsers;
    }

    this.datasets = [
      {
        data: userCount,
        label: 'User Count',
        borderColor: 'rgba(0,0,0,0.8)',
        fill: false,
        datalabels: {
          align: 'center',
          anchor: 'center'
        }
      }
    ];

    this.isShown = true;
    this.isLoading = false;

    this.chartType = 'line';
    this.options = {
      scaleShowVerticalLines: false,
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            maxRotation: 90,
            minRotation: 90,
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'User Count'
          }
        }],
        xAxes: [{
          ticks: {
            maxRotation: 90,
            minRotation: 90
          },
          scaleLabel: {
            display: true,
            labelString: 'level'
          }
        }]
      },
      plugins: {
        datalabels: {
          backgroundColor: (context: { dataset: { borderColor: any; }; }) => context.dataset.borderColor,
          borderRadius: 4,
          color: 'white',
          font: {
            weight: 'bold'
          },
          formatter: Math.round,
          padding: 3
        }
      }
    };
  }

}
