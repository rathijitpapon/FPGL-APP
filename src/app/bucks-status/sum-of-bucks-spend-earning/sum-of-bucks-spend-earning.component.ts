import {Component, Input, OnInit} from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {SourceSinkService} from '../../services/source-sink.service';
import {LoaderService} from '../../loader/loader.service';
import {Chart} from 'chart.js';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sum-of-bucks-spend-earning',
  templateUrl: './sum-of-bucks-spend-earning.component.html',
  styleUrls: ['./sum-of-bucks-spend-earning.component.css']
})
export class SumOfBucksSpendEarningComponent implements OnInit, OnChanges {

  @Input() public selectedDatabase: any;
  @Input() public lowerLimitOfBucks: any;
  @Input() public upperLimitOfBucks: any;
  @Input() public selectedMinTimeSpan: any;
  @Input() public selectedMaxTimeSpan: any;
  @Input() public selectedAppVersion: any;

  options: any;
  legend: any = true;
  chartType: any;
  datasets: any;
  labels: any;
  isShown: any = false;
  barChartPlugins: any = [ChartDataLabels];
  width: any;
  fontSize: any;
  fontWeight: any;
  minTime: any;
  maxTime: any;

  constructor(private sourceSinkService: SourceSinkService, public loaderService: LoaderService) {
    Chart.plugins.unregister(ChartDataLabels);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchData();
  }

  ngOnInit(): void {
    // this.fetchData();
  }

  fetchData(): void {
    this.fontSize = (window.innerWidth < 800) ? 7 : 12;
    this.fontWeight = (window.innerWidth < 800) ? 'normal' : 'bold';
    this.datasets = [];
    this.labels = [];
    this.options = {};
    this.isShown = false;
    this.sourceSinkService.getTotalBucksSpendAndEarning(this.selectedDatabase, this.upperLimitOfBucks,
      this.lowerLimitOfBucks, this.selectedMinTimeSpan, this.selectedMaxTimeSpan,
      this.selectedAppVersion)
      .subscribe((param: any) => {
        this.isShown = true;
        this.labels = param.userLevel;
        this.datasets = [{
          data: param.totalBucksEarn,
          label: 'total Bucks Earn',
          borderColor: 'rgba(0,0,0,0.8)',
          fill: false,
          datalabels: {
            align: 'top',
            anchor: 'end'
          }
        },
          {
            data: param.totalBucksSpend,
            label: 'total Bucks Spend',
            borderColor: 'rgba(0,0,0,0.8)',
            datalabels: {
              align: 'start',
              anchor: 'start'
            }
          }
        ];
      });
    this.chartType = 'bar';
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
            display: false,
            labelString: 'total bucks'
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
          },
          stacked: true
        }]
      },
      legend: {
        labels: {
          usePointStyle: true
        }
      },
      plugins: {
        datalabels: {
          font: {
            size: this.fontSize,
            weight: this.fontWeight
          },
          color: '#000000',
          rotation: -90
        }
      }
    };

    let timestamp = new Date();
    timestamp = new Date(timestamp.getTime() - timestamp.getTimezoneOffset() * 60000);
    // this.currentTime = new Date(timestamp.getTime()).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    timestamp = new Date(timestamp.getTime() - this.selectedMinTimeSpan * 60 * 60 * 1000);
    this.minTime = new Date(timestamp).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    // this.lastNDaysTime = new Date(timestamp)
    timestamp = new Date();
    timestamp = new Date(timestamp.getTime() - timestamp.getTimezoneOffset() * 60000);
    timestamp = new Date(timestamp.getTime() - (this.selectedMaxTimeSpan * 60 * 60 * 1000));
    this.maxTime = new Date(timestamp).toISOString().replace(/T/, ' ').replace(/\..+/, '');

  }

}
