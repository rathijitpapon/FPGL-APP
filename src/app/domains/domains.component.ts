import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit {

  domains = [
    'com.fpg.sharkattack',
    'com.fpg.seaworldsimulator',
    'com.tapmonkey.dinowater',
    'com.funvai.idlebillionaire',
    'com.tappocket.dinozoostar',
    'com.ziau.sharkworld',
    'com.ziau.magicdragonvillage',
    'com.funvai.idleaquarium',
    'com.fpg.dinoattack',
    'com.fpg.dinowater3d',
    'com.ziau.seamonstercity',
    'com.fpg.turkey',
    'com.fpg.colorunity'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
