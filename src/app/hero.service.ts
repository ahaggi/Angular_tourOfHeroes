import { Injectable } from '@angular/core';
import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";
import { Observable, of } from 'rxjs';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private logService: LogService) { }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the log _after_ fetching the heroes
    this.logService.add('HeroService: fetched heroes');
    return of(HEROES);  //OBS of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
  }
  getHero(id: number): Observable<Hero> {
    // TODO: send the log _after_ fetching the heroes
    this.logService.add(`HeroService: fetched a hero with id= ${id}`);
    return of(HEROES.find(hero => hero.id === id));  //OBS of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
  }

  deleteHero(hero:Hero):void{ //retur typen skulle ikkje vere void
    var index = HEROES.indexOf(hero)
    HEROES.splice(index , 1)
    }
}
