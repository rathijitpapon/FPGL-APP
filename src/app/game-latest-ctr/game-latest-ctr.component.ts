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

  form: FormGroup;

  apps: any[] = [];
  ctrs: any[] = [];
  database = '';
  defaultVersion = '';
  defaultUserCount = 0;
  versionsData: any[] = [];

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
      this.defaultVersion = '';
      this.versionsData = [];
      this.ctrBarData = [];
      this.database = params.get('name') + '';

      const data = {
        database: this.database,
        limit: this.limit.value,
        offset: this.offset.value
      };
      this.fetchVersions(this.limit.value, this.offset.value, this.database);
    });
  }

  selectVersion(version: string): void {
    this.defaultVersion = version;
    for (const data of this.versionsData){
      if (data.version === version){
        this.defaultUserCount = data.user_count;
        break;
      }
    }

    this.fetchCTR(this.limit.value, this.offset.value, this.database, this.defaultVersion);
  }

  fetchVersions(limit: number, offset: number, database: string): void {
    this.service.getVersions(limit, offset, database)
      .subscribe((response: any) => {
        this.versionsData = response.data;
        for (let i = this.versionsData.length - 1; i >= 0; i--) {
          if (this.versionsData[i].user_count >= 50) {
            this.defaultVersion = this.versionsData[i].version;
            this.defaultUserCount = this.versionsData[i].user_count;
            break;
          }
        }

        this.fetchCTR(this.limit.value, this.offset.value, this.database, this.defaultVersion);
      }, (error: any) => {
        console.log(error);
      });
  }

  fetchCTR(limit: number, offset: number, database: string, version: string): void {
    this.service.getCTR(limit, offset, database, version)
      .subscribe((response: any) => {
        this.apps = [];
        this.ctrs = [];

        for (const app of response.data) {
          if (app.c1.length > 1){
            this.apps.push(app.c1);
            this.ctrs.push(app.ctr);
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
        label: this.defaultVersion
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
