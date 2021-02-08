import { Component } from '@angular/core';
import {LoaderService} from './loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FPGL-APP';
  constructor(public loaderService: LoaderService) {}
}
