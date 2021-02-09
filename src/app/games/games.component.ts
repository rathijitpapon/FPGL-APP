import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games = [
    'dinobattlegp2012',
    'dragonbattle2012',
    'dragoncarefgp',
    'dragoncareios',
    'dragoncastle2012',
    'jseaattackios',
    'jsniper3dfgp',
    'jurassicseagp',
    'policevsthieffgp',
    'policevsthieffios',
    'seamonstergp2012',
    'sharkattackios',
    'sharkworld3dfgp'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
