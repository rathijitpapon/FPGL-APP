import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        for (const version of response.v) {
          version.id = id++;
          this.versions.push(version);
        }

        id = 0;
        for (const app of response.c1) {
          app.id = id++;
          this.apps.push(app);
        }
      }, (error: any) => {
        console.log(error);
      });
  }

  get limit(): any  {
    return this.form.get('limit');
  }

  get offset(): any {
    return this.form.get('offset');
  }

  // get apps(): any {
  //   return this.form.get('apps');
  // }

  // get versions(): any {
  //   return this.form.get('versions');
  // }

}
