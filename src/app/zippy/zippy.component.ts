import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-zippy',
  templateUrl: './zippy.component.html',
  styleUrls: ['./zippy.component.css']
})
export class ZippyComponent implements OnInit {

  @Input() title = '';
  isExpanded = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

}
