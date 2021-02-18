import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-drawing-chart',
  templateUrl: './drawing-chart.component.html',
  styleUrls: ['./drawing-chart.component.css']
})
export class DrawingChartComponent implements OnInit {

  @Input() public options: any;
  @Input() public legend: any;
  @Input() public datasets: any;
  @Input() public chartType: any;
  @Input() public labels: any;
  @Input() public barChartPlugins: any;
  @Input() public height: any;
  @Input() public width: any;

  constructor() { }

  ngOnInit(): void {

  }

}
