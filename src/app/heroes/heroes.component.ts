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

  /* Reserve the constructor for simple initialization such as wiring constructor parameters to properties. 
  The constructor shouldn't do anything. It certainly shouldn't call a function that makes HTTP requests to
   a remote server as a real data service would. Instead, use ngOnInit() for such tasks*/
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
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

  //Although the component delegates hero adding to the HeroService, it remains responsible for updating its own list of heroes
  add(name: string): void {

    const observer = {
      next: hero => {
        this.heroes.push(hero);
      }
    }
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero) // cast {name} as Hero obj
      .subscribe(observer);
  }

  // Although the component delegates hero deletion to the HeroService, it remains responsible for updating its own list of heroes
  delete(hero: Hero): void {
    const observer = {
      next: _ => { //Obs observable av deleteHero er lik null!!!
        this.heroes = this.heroes.filter(h => h !== hero)
      }
    }

    this.heroService.deleteHero(hero).subscribe(observer);
  }

  fn(index: number, hero: Hero): number { return hero.id; }

}
