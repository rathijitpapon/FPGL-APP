import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartDataSets } from 'chart.js';
import { CtrService } from '../services/ctr-service.service';

@Component({
  selector: 'app-ctr',
  templateUrl: './ctr.component.html',
  styleUrls: ['./ctr.component.css']
})
export class CtrComponent implements OnInit {
  form: FormGroup;
  apps: any[] = [];
  versions: any[] = [];

  selectedApps: any[] = [];
  selectedVersions: any[] = [];

  ctrBarData: any[] = [];

  constructor(fb: FormBuilder, private service: CtrService) {
    this.form = fb.group({
      limit: ['', Validators.required],
      offset: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  selectApps(appId: number): void {
    const app = {
      id: appId,
      name: this.apps[appId].c1,
    };

    let id = 0;
    for (const sa of this.selectedApps){
      if (sa.id === appId) {
        this.selectedApps.splice(id, 1);
        return;
      }
      id++;
    }
    this.selectedApps.push(app);
  }

  selectVersions(versionId: number): void {
    const version = {
      id: versionId,
      name: this.versions[versionId].app_version,
    };

    let id = 0;
    for (const sv of this.selectedVersions) {
      if (sv.id === versionId) {
        this.selectedVersions.splice(id, 1);
        return;
      }
      id++;
    }
    this.selectedVersions.push(version);
  }

  fetchData(data: any): void {
    this.service.getData(data.limit, data.offset)
      .subscribe((response: any) => {
        let id = 0;
        const willShow = [];
        for (const app of response.c1) {
          willShow.push(app.c1);
          app.id = id++;
          this.apps.push(app);
        }

        id = 0;
        for (const version of response.v) {
          version.id = id++;
          this.versions.push(version);

          const ctr = this.calculateCTR(version, willShow);
          this.ctrBarData.push(ctr);
        }
      }, (error: any) => {
        console.log(error);
      });
  }

  showGraph(): void {
    const willShow = [];
    for (const app of this.selectedApps){
      willShow.push(app.name);
    }

    this.ctrBarData = [];
    for (const v of this.selectedVersions) {
      const version = this.versions[v.id];

      const ctr = this.calculateCTR(version, willShow);
      this.ctrBarData.push(ctr);
    }
  }

  calculateCTR(version: any, willShow: any[]): any {
    const ctr: any = {
      barChartLabels: [],
    };
    const ctrValues = [];

    for (const promo of version.cross_promos) {
      if (!willShow.includes(promo.c1)){
        continue;
      }

      const value = (promo.total_install_clicked / (promo.total_ad_start + 0.0000001) ) * 100;

      ctrValues.push(value);
      ctr.barChartLabels.push(promo.c1);
    }

    const barChartData: ChartDataSets[] = [{
      data: ctrValues,
      label: version.app_version
    }];
    ctr.chartData = barChartData;

    return ctr;
  }

  get limit(): any  {
    return this.form.get('limit');
  }

  get offset(): any {
    return this.form.get('offset');
  }

}
