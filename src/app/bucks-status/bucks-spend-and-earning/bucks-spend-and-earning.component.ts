import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {SourceSinkService} from '../../services/source-sink.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';
import {LoaderService} from '../../loader/loader.service';
import {DrawingChartComponent} from '../../drawing-chart/drawing-chart.component';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bucks-spend-and-earning',
  templateUrl: './bucks-spend-and-earning.component.html',
  styleUrls: ['./bucks-spend-and-earning.component.css']
})
export class BucksSpendAndEarningComponent implements OnInit, OnChanges {

  constructor(private sourceSinkService: SourceSinkService, public loaderService: LoaderService) {
    Chart.plugins.unregister(ChartDataLabels);
  }

  @Input() selectedDatabase: any;
  @Input() lowerLimitOfBucks: any;
  @Input() upperLimitOfBucks: any;
  @Input() public selectedMinTimeSpan: any;
  @Input() public selectedMaxTimeSpan: any;
  @Input() public selectedAppVersion: any;

  @ViewChild(DrawingChartComponent) drawingChartComponent!: DrawingChartComponent;


  legendDataforEarn = [];
  legendDataforSpend = [];
  private flagArray: any[] = [];
  width: any;
  height: any;
  fontWeight: any;
  legendPosition: any;

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

  // @HostListener('window:resize', ['$event'])
  onResize(event: any): any {
    this.width = window.innerWidth + ((window.innerWidth <= 850) ? 600 : 0);
    this.height = 750;
    this.fontWeight = (window.innerWidth > 850) ? 'bold' : 'normal';
    this.legendPosition = (window.innerWidth > 850) ? 'right' : 'top';
    this.drawingChartComponent.onResize(event.target.innerWidth > 850, this.legendPosition,
      this.fontWeight, this.width, this.height);
  }

  // barChartPlugins = [];


  ngOnInit(): void {
    // this.fetchData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchData();
  }

  fetchData(): void {
    this.width = window.innerWidth + ((window.innerWidth < 850) ? 600 : 0);
    this.height = 750;
    this.fontWeight = (window.innerWidth < 800) ? 'normal' : 'bold';
    this.legendPosition = (window.innerWidth < 800) ? 'top' : 'right';
    this.datasets = [];
    this.labels = [];
    this.options = {};
    this.isShown = false;
    this.sourceSinkService.getBucksSpendAndEarning(this.selectedDatabase, this.upperLimitOfBucks,
      this.lowerLimitOfBucks, this.selectedMinTimeSpan, this.selectedMaxTimeSpan,
      this.selectedAppVersion)
      .subscribe((param: any) => {
        this.isShown = true;
        this.labels = param.userLevels;
        Object.keys(param.averageEarns).forEach(item => {
          this.datasets.push({
            data: param.averageEarns[item],
            label: item
          });
        });
        Object.keys(param.averageSpends).forEach(item => {
          this.datasets.push({
            data: param.averageSpends[item],
            label: item
          });
        });
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
              item.label = item.label.slice(7, 11) + ': ' + item.label.slice(11);
            } else {
              // @ts-ignore
              this.legendDataforSpend.push(item.label);
              item.label = item.label.slice(7, 12) + ': ' + item.label.slice(12);
            }

          }
        });
        this.datasets = [];
        temp.forEach((i) => {
          this.datasets.push(i);
          this.flagArray.push(true);
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
      maintainAspectRatio: false,
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
            // if (window.innerWidth < 1000) {
            //   return ' ';
            // }
            if (Number(value) * 100 / this.maxPositiveValue > 10 || Number(value) * 100 / this.maxNegativeValue > 10) {
              return Number(value).toFixed(0);
            }
            return '';
          },
          align: 'center',
          anchor: 'center',
          font: {
            weight: this.fontWeight
          },
          color: '#000000',
          rotation: -90
        }
      },
      legend: {
        position: this.legendPosition,
        labels: {
          usePointStyle: true,
        },
        // onClick: (e: any, legendItem: any, legend: any) => {
        //   // console.log(e);
        //   // console.log(e.target.__ngContext__[22][0]);
        //   // console.log(legendItem);
        //   // const ci = legend.chart;
        //   legendItem.hidden = !legendItem.hidden;
        //   console.log(this.datasets[legendItem.datasetIndex]);
        //   this.datasets[legendItem.datasetIndex]._meta[2].data.forEach((item: { hidden: boolean; }) => {
        //     item.hidden = true;
        //   });
        //   this.datasets[legendItem.datasetIndex]._meta[2].hidden = true;
        //   this.datasets[legendItem.datasetIndex]._meta[2].bar = false;
        //
        //   console.log(this.datasets[legendItem.datasetIndex]._meta[2].hidden);
        //   // this.datasets[legendItem.datasetIndex].hidden = legendItem.hidden;
        //   // ci.hide(legendItem.datasetIndex);
        //   // this.datasets.splice(legendItem.datasetIndex, 1);
        //   this.options.scales.xAxes[1].ticks.callback(1, 38);
        // }
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

