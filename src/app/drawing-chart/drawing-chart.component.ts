import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-drawing-chart',
  templateUrl: './drawing-chart.component.html',
  styleUrls: ['./drawing-chart.component.css']
})
export class DrawingChartComponent implements OnInit {

  @ViewChild('myChart') public myChart!: ElementRef;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | any;


  @Input() public options: any;
  @Input() public legend: any;
  @Input() public datasets: any;
  @Input() public chartType: any;
  @Input() public labels: any;
  @Input() public barChartPlugins: any;
  @Input() public height: any;
  @Input() public width: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  onResize(flag?: any, legendPosition?: string, fontWeight?: string, width?: number,
           height?: number): any {
    if (flag) {
      this.chart.chart.resize();
      this.chart.chart.width = width;
    } else {
      this.chart.chart.width = width;
    }
    this.chart.chart.options.legend.position = legendPosition;
    this.chart.chart.options.plugins.datalabels.font.weight = fontWeight;
    this.chart.chart.height = height;
    this.chart.chart.update();
  }
}
