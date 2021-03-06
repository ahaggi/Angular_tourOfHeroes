import { Component, OnInit, Input, } from '@angular/core';
import { Hero } from '../hero';


import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail1',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
  // Alternatively you can Declare Input and Output hear instead of input/output Decorators
  //   inputs: ['heroDetails'],
  //   outputs: ['deleteRequest'],

})

export class HeroDetailComponent implements OnInit {
  @Input() heroDetails: Hero;



  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) { }


  ngOnInit() {
    this.getHero();
  }
  getHero(): void{
    const id = +this.route.snapshot.paramMap.get("id");

    const observer = {
      next: (fetched_hero)=> this.heroDetails = fetched_hero,
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification: hero-detail.component'),
    }
    this.heroService.getHero(id).subscribe(observer);
  }
  goBack():void{
    this.location.back();
  }

  save(): void {

    const observer = {
      next:() => this.goBack()
    }
    this.heroService.updateHero(this.heroDetails)
      .subscribe(observer);
  }


  // Although the component delegates hero deletion to the HeroService, it remains responsible for updating its own list of heroes
  delete(): void {
    const observer  = {
      next: () => { //Obs observable av deleteHero er lik null!!!
        this.goBack()
      }
    }
    
    this.heroService.deleteHero(this.heroDetails).subscribe(observer);
  }
}
