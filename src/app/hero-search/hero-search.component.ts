import { Component, OnInit } from '@angular/core';

import { Observable, Subject, from, of } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap, filter, tap, defaultIfEmpty
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();


  constructor(private heroService: HeroService) { }


  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 200ms after each keystroke before considering the term
      debounceTime(200),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
      tap(h=> console.log(h)),

      );
  }



    // Push a search term into the subject stream.
    search(term: string): void {
      this.searchTerms.next(term);
    }
  
    // search_without_subject_using_from(term: string): void {
    //   // TODO sjekk hvorfor "from" produserer en feilMelding om det blir tastet "non-Printable Characters"; dvs term == '' ,, MEN "of" fungerer helt greit!
    //   // dette er for å unngå feilMeldingen.
    //   let arg = (term && term.length > 0) ? term : " ";
  
    //   this.heroes$ = from(arg).pipe(
  
    //     // wait 200ms after each keystroke before considering the term
    //     debounceTime(200),
  
    //     // ignore new term if same as previous term
    //     distinctUntilChanged(),
  
    //     // switch to new search observable each time the term changes
    //     switchMap((term: string) => this.heroService.searchHeroes(term)),
    //   );
    // }
  
  
    search_without_subject_using_of(term: string): void {
      this.heroes$ = of(term).pipe(
  
        // wait 200ms after each keystroke before considering the term
        debounceTime(200),
  
        // ignore new term if same as previous term
        distinctUntilChanged(),
  
        // switch to new search observable each time the term changes
        switchMap((term: string) => this.heroService.searchHeroes(term)),
      );
    }
  
}



/* ************** subscribe-vs-async-pipe-in-component-templates  **************


https://blog.angularindepth.com/angular-question-rxjs-subscribe-vs-async-pipe-in-component-templates-c956c8c0c794



There are multiple ways in which it is possible to consume this observable stream of state updates by the components, the two most popular being:

    1-Using the subscribe() method and storing the state on the component instance, todos$.subscribe(todos => this.todos = todos)...
    2-The | async pipe unwraps the state object directly in the component’s template, <li *ngFor=”let todo of todos$ | async”></li>... som blir implemetert ovenfor

    Case 1: Use subscribe() in the ngOnInit method  //  BLIR IKKE IMPLEMENTERT
    Class HeroSearchcomponent{
      heroes: Hero[];
      private searchTerms = new Subject<string>();

      ...
      noOnInit(){
        this.searchTerms.pipe( det samme som ovenfor implementasjon)
          .subscribe((hs)=> this.heroes = hs)
      }
    } //class

    template:
    <ul >
    <li *ngFor="let hero of heroes" > OBS heroes ER IKKE OBSERVABLE HER DEN ER VANLIG LIST
      <a routerLink="/detail/{{hero.id}}">
        {{hero.name}}
      </a>
    </li>
    </ul>
*/




