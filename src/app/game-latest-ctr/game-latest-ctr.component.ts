import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets } from 'chart.js';
import { CtrService } from '../services/ctr-service.service';

@Component({
  selector: 'app-game-latest-ctr',
  templateUrl: './game-latest-ctr.component.html',
  styleUrls: ['./game-latest-ctr.component.css']
})
export class GameLatestCtrComponent implements OnInit {

  domains = [
    ['com.ziau.dinoschool', 'dinobattlegp2012'],
    ['com.ziau.elfcity', 'dragonbattle2012'],
    ['com.funvai.dragoncare', 'dragoncarefgp'],
    // ['com.funvai.dragoncare', 'dragoncareios'],
    ['com.tappocket.dragoncastle', 'dragoncastle2012'],
    ['com.fpg.jseattack', 'jseaattackios'],
    ['com.funvai.jseasniper', 'jsniper3dfgp'],
    ['com.tappocket.squishyfishy', 'jurassicseagp'],
    ['com.funvai.policevsthief', 'policevsthieffgp'],
    // ['com.fpg.jseattack', 'policevsthieffios'],
    ['com.ziau.seamonstercity', 'seamonstergp2012'],
    ['com.fpg.sharkattack', 'sharkattackios'],
    ['com.fpg.sharkslap', 'sharkworld3dfgp']
  ];
  willShowLink: any[] = [];
  willShow: any[] = [];

  form: FormGroup;

  apps: any[] = [];
  ctrs: any[] = [];
  database = '';
  latestVersion = '';

  ctrBarData: any[] = [];

  constructor(fb: FormBuilder, private service: CtrService, private route: ActivatedRoute) {
    this.form = fb.group({
      limit: ['', Validators.required],
      offset: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.limit.setValue(20000);
    this.offset.setValue(0);

    this.route.paramMap.subscribe(params => {
      this.latestVersion = '';
      this.willShow = [];
      this.willShowLink = [];
      this.ctrBarData = [];
      this.database = params.get('name') + '';

      const data = {
        database: this.database,
        limit: this.limit.value,
        offset: this.offset.value
      };
      this.fetchData(data);
    });
  }

  fetchData(data: any): void {
    this.service.getCTR(data.limit, data.offset, data.database)
      .subscribe((response: any) => {
        this.latestVersion = response.latest_version;
        this.apps = [];
        this.ctrs = [];
        this.willShow = [];
        this.willShowLink = [];

        for (const app of response.data) {
          if (app.c1.length > 1){
            this.apps.push(app.c1);
            this.ctrs.push(app.ctr);

            let isExist = false;
            for (const domain of this.domains) {
              if (domain[0] === app.c1) {
                this.willShowLink.push(domain);
                isExist = true;
                break;
              }
            }
            if (!isExist) {
              this.willShow.push(app.c1);
            }
          }
        }

        this.showGraph();
      }, (error: any) => {
        console.log(error);
      });
  }

  showGraph(): void {
    this.ctrBarData = [];
    const chartData: ChartDataSets[] = [{
        data: this.ctrs,
        label: this.latestVersion
    }];
    const ctr = {
      barChartLabels: this.apps,
      chartData
    };

    this.ctrBarData.push(ctr);
  }

  get limit(): any  {
    return this.form.get('limit');
  }

  get offset(): any {
    return this.form.get('offset');
  }

}
