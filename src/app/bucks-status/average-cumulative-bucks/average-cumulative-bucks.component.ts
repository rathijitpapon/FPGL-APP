import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SourceSinkService} from '../../services/source-sink.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-average-cumulative-bucks',
  templateUrl: './average-cumulative-bucks.component.html',
  styleUrls: ['./average-cumulative-bucks.component.css']
})
export class AverageCumulativeBucksComponent implements OnInit, OnChanges {

  @Input() selectedDatabase: any;
  @Input() public selectedMinTimeSpan: any;
  @Input() public selectedMaxTimeSpan: any;
  @Input() lowerLimitOfBucks = 0;
  @Input() upperLimitOfBucks = 0;
  @Input() selectedAppVersion = 0;

  legendDataforEarn = [];
  legendDataforSpend = [];
  private flagArray: any[] = [];
  width: any;

  constructor(private sourceSinkService: SourceSinkService) {
    Chart.plugins.unregister(ChartDataLabels);
  }

  options: any;
  legend: any = true;
  chartType: any;
  datasets: any;
  labels: any;
  isShown: any = false;
  maxPositiveValue = 0;
  maxNegativeValue = 0;
  barChartPlugins = [ChartDataLabels];
  minTime: any;
  maxTime: any;
  isLoading = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchData();
  }

  ngOnInit(): void {
    // this.fetchData();
  }

  async fetchData(): Promise<void> {
    this.width = window.innerWidth + ((window.innerWidth < 1000) ? 250 : 0);
    this.datasets = [];
    this.labels = [];
    this.options = {};
    this.isShown = false;
    this.isLoading = true;

    await this.sourceSinkService.getAverageCumulativeBucksSpendAndEarn(
      this.selectedDatabase,
      this.upperLimitOfBucks,
      this.lowerLimitOfBucks,
      this.selectedMinTimeSpan,
      this.selectedMaxTimeSpan,
      this.selectedAppVersion
      )
      .toPromise()
      .then((data: any) => {
        this.isShown = true;
        this.labels = data.userLevel;
        this.datasets = [
          {
            data: data.averageBucksSpend,
            label: 'averageSpend'
          },
          {
            data: data.averageBucksEarn,
            label: 'averageEarn'
          },
        ];

        const temp: any[] = [];
        this.datasets.forEach((item: any) => {
          let flag = true;
          temp.push(item);
          const precision = 0.01;
          item.data.forEach((i: number) => {
            if (Math.abs(i) >= precision) {
              flag = false;
            }
          });
          if (flag) {
            temp.pop();
          } else {
            if (item.label.includes('Earn')) {
              // @ts-ignore
              this.legendDataforEarn.push(item.label);
            } else {
              // @ts-ignore
              this.legendDataforSpend.push(item.label);
            }
          }
        });

        this.datasets = [];
        temp.forEach((i) => {
          this.datasets.push(i);
          this.flagArray.push(true);
        });
        this.isLoading = false;
      });

    this.chartType = 'bar';
    this.options = {
        layout: {
          padding: {
            left: 12
          }
        },
        responsive: false,
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              maxRotation: 90,
              minRotation: 90,
              beginAtZero: true,
            },
            scaleLabel: {
              display: false
            },
            stacked: true,
            gridLines: {
              display: false
            }
          },
          ],
          xAxes: [{
            ticks: {
              maxRotation: 90,
              minRotation: 90
            },
            scaleLabel: {
              display: false,
              labelString: 'level'
            },
            stacked: true,
            gridLines: {
              display: false
            }
          },
            {
              type: 'category',
              offset: true,
              position: 'top',
              ticks: {
                fontColor: '#000000',
                fontStyle: 'bold',
                maxRotation: 90,
                minRotation: 90,
                callback: (value: any, index: any) => {
                  let total = 0;
                  this.datasets.forEach((item: { label: string | string[]; data: { [x: string]: any; }; }) => {
                    if (item.label.includes('Earn')) {
                      total += Number(item.data[index]);
                    }
                  });
                  this.maxPositiveValue = Math.max(total, this.maxPositiveValue);
                  return total.toFixed(2);
                }
              }
            },
            {
              type: 'category',
              offset: true,
              position: 'below',
              ticks: {
                fontColor: '#000000',
                fontStyle: 'bold',
                maxRotation: 90,
                minRotation: 90,
                callback: (value: any, index: any, values: any) => {
                  let total = 0;
                  this.datasets.forEach((item: { label: string | string[]; data: { [x: string]: any; }; }) => {
                    if (item.label.includes('Spend')) {
                      total += Number(item.data[index]);
                    }
                  });
                  this.maxNegativeValue = Math.min(this.maxNegativeValue, total);
                  return total.toFixed(2);
                }
              }
            }
          ]
        },
        plugins: {
          datalabels: {
            formatter: (value: any, ctx: any) => {
              if (Number(value) * 100 / this.maxPositiveValue > 10 || Number(value) * 100 / this.maxNegativeValue > 10) {
                return Number(value).toFixed(0);
              }
              return '';
            },
            align: 'center',
            anchor: 'center',
            font: {
              weight: 'bold'
            },
            color: '#000000',
            rotation: -90
          }
        },
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
          },
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
