import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
  // Alternatively you can Declare Input and Output hear instead of input/output Decorators
  //   inputs: ['heroDetails'],
  //   outputs: ['deleteRequest'],

})

export class HeroDetailComponent implements OnInit {
  @Input() heroDetails: Hero;
  @Output() deleteRequest = new EventEmitter<Hero>();



  constructor() { }
// This component makes a request but it can't actually delete a hero.
  delete() {
    this.deleteRequest.emit(this.heroDetails);
  }
  ngOnInit() {
  }

}
