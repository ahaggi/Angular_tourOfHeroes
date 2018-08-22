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

  deleteHero(hero:Hero):void{
    var index = HEROES.indexOf(hero)
    HEROES.splice(index , 1)
    }
}
