import {Component, OnInit} from '@angular/core';
import {SourceSinkService} from '../services/source-sink.service';

@Component({
  selector: 'app-bucks-status',
  templateUrl: './bucks-status.component.html',
  styleUrls: ['./bucks-status.component.css']
})
export class BucksStatusComponent implements OnInit {

  games = [
    'dinobattlegp2012',
    'dragonbattle2012',
    'dragoncarefgp',
    // 'dragoncareios',
    'dragoncastle2012',
    'jseaattackios',
    'jsniper3dfgp',
    'jurassicseagp',
    'policevsthieffgp',
    // 'policevsthieffios',
    'seamonstergp2012',
    'sharkattackios',
    'sharkworld3dfgp'
  ];

  selectedDatabase: string | undefined;
  options: any;
  legend: any = true;
  chartType: any;
  datasets: any;
  labels: any;
  isShown: any = false;
  lowerLimitOfBucks = 0;
  upperLimitOfBucks = 0;


  constructor(private sourceSinkService: SourceSinkService) {
  }

  ngOnInit(): void {
  }

  fetchData(): void {
    if (this.upperLimitOfBucks < this.lowerLimitOfBucks) {
      return alert(`upper limit must be greater than lower limit`);
    }
    this.sourceSinkService.getBucksStatus(this.selectedDatabase, this.upperLimitOfBucks, this.lowerLimitOfBucks).subscribe((param: any) => {
      console.log(param.userLevels);
      console.log(param.averageBucks);
      this.isShown = true;
      this.labels = param.userLevels;
      this.datasets = [{
        data: param.averageBucks,
        label: 'average bucks',
        borderColor: 'rgba(0,0,0,0.8)',
        fill: false
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
      }
    };
  }
}
