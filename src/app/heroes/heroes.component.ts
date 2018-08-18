import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  private heroes: Hero[];
  selectedHero: Hero;

  /* Reserve the constructor for simple initialization such as wiring constructor parameters to properties. 
  The constructor shouldn't do anything. It certainly shouldn't call a function that makes HTTP requests to
   a remote server as a real data service would. Instead, use ngOnInit() for such tasks*/
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  fn(index: number, hero: Hero): number { return hero.id; }

}
