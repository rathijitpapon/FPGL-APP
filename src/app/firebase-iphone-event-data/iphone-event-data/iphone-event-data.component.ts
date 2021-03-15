import {Component, Input, OnInit} from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';
import { SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';
import { FirebaseIphoneDataServiceService } from 'src/app/services/firebase-iphone-data-service.service';

@Component({
  selector: 'app-iphone-event-data',
  templateUrl: './iphone-event-data.component.html',
  styleUrls: ['./iphone-event-data.component.css']
})
export class IphoneEventDataComponent implements OnInit, OnChanges {

  @Input() public eventName: any;
  @Input() public startDate: any;
  @Input() public endDate: any;
  @Input() public game: any;
  @Input() public metricName: any;

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

  targetStreamName: any = {
    1603593222: 'Dragon Battle Info GP',
    1425592070: 'Sea Monster City GP',
    1425652333: 'Sea Jurassic Craft IOS',
    1430416034: 'Shark World GP',
    1208333242: 'Dino Battle Gp',
    1424447206: 'Jurassic Pixel Dinosaur Craft',
    1596135788: 'Jurassic Pixel Craft GP'
  };

  constructor(private firebaseService: FirebaseIphoneDataServiceService) {
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
      this.metricName,
      this.game,
      minDate,
      maxDate,
    );

    const streamData: any = {};
    for (const value of data) {
      if (value.streamId in this.targetStreamName) {
        value.streamId = this.targetStreamName[value.streamId];
      }
      streamData[value.streamId] = {
        userCount: [],
        labels: [],
        totalUsers: 0,
      };
    }

    for (const value of data) {
      streamData[value.streamId].labels.push(value.date);
      streamData[value.streamId].userCount.push(value.newUsers);
      streamData[value.streamId].totalUsers += +value.newUsers;

      this.userCount += +value.newUsers;
      this.labels = streamData[value.streamId].labels;
    }

    for (const key of Object.keys(streamData)) {
      this.datasets.push([{
        key,
        totalUsers: streamData[key].totalUsers,
        data: streamData[key].userCount,
        label: 'User Count',
        borderColor: 'rgba(0,0,0,0.8)',
        fill: false,
        datalabels: {
          align: 'center',
          anchor: 'center'
        }
      }]);
    }

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
