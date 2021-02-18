import {Component, OnInit} from '@angular/core';
import {CtrService} from '../services/ctr-service.service';
import {ActivatedRoute} from '@angular/router';
import {LoaderService} from '../loader/loader.service';

@Component({
  selector: 'app-ctr-with-respect-to-source',
  templateUrl: './ctr-with-respect-to-source.component.html',
  styleUrls: ['./ctr-with-respect-to-source.component.css']
})
export class CtrWithRespectToSourceComponent implements OnInit {

  datasets: any;
  legend: any;
  chartType: any;
  options: any;
  labels: any;
  database: any;
  isShown = false;

  constructor(private serviceService: CtrService, private router: ActivatedRoute, public loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.database = params.get('name');
    });
  }

  getdata(): void {
    this.serviceService.getCTRWrtSource(this.database).subscribe((object: any) => {
      this.labels = object['c1'];
      this.isShown = true;
      this.datasets = [{
        data: object['ctr_in_quit_panel'],
        label: 'ctr_in_quit_panel',
        backgroundColor: 'rgba(166, 242, 99,0.8)'
      },
        {
          data: object['ctr_in_more_games'],
          label: 'ctr_in_more_games',
          backgroundColor: 'rgba(0,0,0,0.8)'
        },
        {
          data: object['ctr_in_cross_promo'],
          label: 'ctr_in_cross_promo',
          backgroundColor: 'rgba(255,0,0,0.6)'
        }
      ];
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
              display: true,
              labelString: 'ctr(%)'
            }
          }],
          xAxes: [{
            ticks: {
              maxRotation: 90,
              minRotation: 90
            },
            scaleLabel: {
              display: true,
              labelString: 'Promo Ad'
            }
          }]
        }
      };
    });
  }
}
