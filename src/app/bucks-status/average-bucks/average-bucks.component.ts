import {Component, Input, OnInit} from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {SourceSinkService} from '../../services/source-sink.service';
import {LoaderService} from '../../loader/loader.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-average-bucks',
  templateUrl: './average-bucks.component.html',
  styleUrls: ['./average-bucks.component.css']
})
export class AverageBucksComponent implements OnInit {

  @Input() public selectedDatabase: any;
  @Input() public lowerLimitOfBucks: any;
  @Input() public upperLimitOfBucks: any;
  @Input() public selectedMinTimeSpan: any;
  @Input() public selectedMaxTimeSpan: any;

  options: any;
  legend: any = true;
  chartType: any;
  datasets: any;
  labels: any;
  isShown: any = false;
  barChartPlugins: any = [ChartDataLabels];
  width: any;


  constructor(private sourceSinkService: SourceSinkService, public loaderService: LoaderService) {
    Chart.plugins.unregister(ChartDataLabels);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.datasets = [];
    this.labels = [];
    this.options = {};
    this.isShown = false;
    this.sourceSinkService.getBucksStatus(this.selectedDatabase, this.upperLimitOfBucks,
      this.lowerLimitOfBucks, this.selectedMinTimeSpan, this.selectedMaxTimeSpan).subscribe((param: any) => {
      this.isShown = true;
      this.labels = param.userLevels;
      this.datasets = [{
        data: param.averageBucks,
        label: 'average bucks',
        borderColor: 'rgba(0,0,0,0.8)',
        fill: false,
        datalabels: {
          align: 'center',
          anchor: 'center'
        }
      }];
    });
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
            labelString: 'average bucks'
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
