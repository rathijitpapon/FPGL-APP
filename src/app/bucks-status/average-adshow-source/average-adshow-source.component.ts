import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SourceSinkService} from '../../services/source-sink.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';
import {LoaderService} from '../../loader/loader.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SimpleChanges } from '@angular/core';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-average-adshow-source',
  templateUrl: './average-adshow-source.component.html',
  styleUrls: ['./average-adshow-source.component.css']
})
export class AverageAdshowSourceComponent implements OnInit, OnChanges {

  @Input() selectedDatabase: any;
  @Input() lowerLimitOfBucks = 0;
  @Input() upperLimitOfBucks = 0;
  @Input() selectedMinTimeSpan = 0;
  @Input() selectedMaxTimeSpan = 0;
  @Input() reqType = '';

  legendData = [];
  private flagArray: any[] = [];
  width: any;

  constructor(private sourceSinkService: SourceSinkService, public loaderService: LoaderService) {
    Chart.plugins.unregister(ChartDataLabels);
  }

  options: any;
  legend: any = true;
  chartType: any;
  datasets: any;
  labels: any;
  isShown: any = false;
  maxPositiveValue = 0;
  barChartPlugins = [ChartDataLabels];
  minTime: any;
  maxTime: any;

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

    this.loaderService._isLoading = new BehaviorSubject<boolean>(true);

    // await this.sourceSinkService.sendMessage('Hello From Frontend')
    //   .subscribe((data: any) => {
    //     console.log(data);
    //   });

    const dataId = this.selectedDatabase + this.reqType + this.selectedMaxTimeSpan + this.selectedMinTimeSpan + (new Date()).getTime();

    await this.sourceSinkService.sendData({
      id: dataId,
      database: this.selectedDatabase,
      reqType: this.reqType,
      hoursMin: this.selectedMinTimeSpan,
      hoursMax: this.selectedMaxTimeSpan
    });

    await this.sourceSinkService.getData(dataId
      )
      .subscribe((data: any) => {
        this.loaderService._isLoading = new BehaviorSubject<boolean>(false);
        this.isShown = true;
        this.labels = data.userLevel;
        const sourcesValue: any = {};

        for (const adData of data.averageAdShowPerSource) {
          if (adData.source.length <= 1) { continue; }
          const source = adData.source;
          sourcesValue[source] = [];
          for (const level of this.labels) {
            sourcesValue[source].push(0);
          }
        }

        for (const adData of data.averageAdShowPerSource) {
          if (adData.source.length <= 1) { continue; }
          const source = adData.source;

          sourcesValue[source][adData.level - 1] = adData.value;
        }

        Object.keys(sourcesValue).map((key: string
          ) => {
          this.datasets.push({
            data: sourcesValue[key],
            label: key,
          });
        });
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
                    total += Number(item.data[index]);
                  });
                  this.maxPositiveValue = Math.max(total, this.maxPositiveValue);
                  return total.toFixed(2);
                }
              }
            }
          ]
        },
        plugins: {
          datalabels: {
            formatter: (value: any, ctx: any) => {
              if (Number(value) * 100 / this.maxPositiveValue > 10) {
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
