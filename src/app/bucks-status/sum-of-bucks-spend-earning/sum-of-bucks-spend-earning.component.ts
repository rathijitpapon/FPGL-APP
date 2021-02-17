import {Component, Input, OnInit} from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {SourceSinkService} from '../../services/source-sink.service';
import {LoaderService} from '../../loader/loader.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-sum-of-bucks-spend-earning',
  templateUrl: './sum-of-bucks-spend-earning.component.html',
  styleUrls: ['./sum-of-bucks-spend-earning.component.css']
})
export class SumOfBucksSpendEarningComponent implements OnInit {

  @Input() public selectedDatabase: any;
  @Input() public lowerLimitOfBucks: any;
  @Input() public upperLimitOfBucks: any;

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
    this.sourceSinkService.getTotalBucksSpendAndEarning(this.selectedDatabase, this.upperLimitOfBucks, this.lowerLimitOfBucks)
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
            weight: 'bold'
          },
          color: '#000000',
          rotation: -90
        }
      }
    };
  }

}
