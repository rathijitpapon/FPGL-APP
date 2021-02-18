import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets } from 'chart.js';
import { CtrService } from '../services/ctr-service.service';

@Component({
  selector: 'app-ctr-on-games',
  templateUrl: './ctr-on-games.component.html',
  styleUrls: ['./ctr-on-games.component.css']
})
export class CtrOnGamesComponent implements OnInit {

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
  curDomain = '';

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
      this.ctrBarData = [];
      this.curDomain = params.get('name') + '';

      this.fetchCTR(this.limit.value, this.offset.value);
    });
  }

  async fetchCTR(limit: number, offset: number): Promise<void> {
    this.apps = [];
    this.ctrs = [];

    let count = this.domains.length;
    for (const domain of this.domains){
      await this.service.getThisCTR(limit, offset, domain[1], this.curDomain)
      .toPromise()
      .then((data: { ctr: number; }) => {
          if (data.ctr) {
            this.apps.push(domain[1]);
            this.ctrs.push(data.ctr);
          }

          count--;
          if (count === 0) {
            this.showGraph();
          }
        }, (error: any) => {
          console.log(error);
      });
    }
  }

  showGraph(): void {
    this.ctrBarData = [];
    const chartData: ChartDataSets[] = [{
        data: this.ctrs,
        label: this.curDomain
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
