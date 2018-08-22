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
  deleteHero(hero: Hero): void {
    this.heroService.deleteHero(hero);
    this.selectedHero = null;
    // this.getHeroes(); 
    // this.heroes and heroService.heroes is the same object
    // if myobserver was = {
      //next: heroes => this.heroes = hs.slice() 
    // }
    // then this.hero and heroService.heroes will be 2 diff arrays
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    // this.heroService.getHeroes()
    //   .subscribe(heroes => this.heroes = heroes); //..subscribe(next handler)


    // Create observer object, next handler is required. The error and complete handlers are optional
    const myObserver = {
      next: heroes => this.heroes = heroes,
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification: heroes.component'),
    };

    const observable = this.heroService.getHeroes();
    observable.subscribe(myObserver);
  }

  fn(index: number, hero: Hero): number { return hero.id; }

}
