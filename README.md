# Branch7
https://angular.io/tutorial/toh-pt6#asyncpipe

### Subjuct AND chain observable operators
**Chain Observable operators together so you can minimize the number of similar HTTP**

A Subject is both a source of observable values and an Observable itself. You can subscribe to a Subject as you would any Observable.




#### Search for heroes by name

you learn to chain Observable operators together so you can minimize the number of similar HTTP requests and consume network bandwidth economically.

You will add a heroes search feature to the Dashboard. As the user types a name into a search box, you'll make repeated HTTP requests for heroes filtered by that name. Your goal is to issue only as many requests as necessary.


Add a searchHeroes method to the HeroService, wich is similar to 
getHero(id: number): Observable<Hero> {...}

searchHeroes(term: string): Observable<Hero[]> {..}

The significant differences are:
- param: search trem for a hero's name 
- the URL, which includes a query string with the search term


**Create HeroSearchComponent**

    `ng generate component hero-search`

*hero-search.component.html*

```
    ...
    <input #searchBox id="search-box" (keyup)="search(searchBox.value)" />
    <li *ngFor="let hero of heroes$ | async" >
      <a routerLink="/detail/{{hero.id}}">
        {{hero.name}}
      </a>
    </li>
    ...
```

As the user types in the search box, a keyup event binding calls the component's search() method with the new search box value

**AsyncPipe (heroes$ | async)**

The $ in heroes$ is a *convention* that indicates heroes$ is an Observable, not an array
The AsyncPipe subscribes to an Observable automatically so you won't have to do so in the component class


*hero-search.component.ts*

*prop:* 
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  searchTerms property is declared as an RxJS Subject

*methods:*
  `search(term: string): void   // Push a search term into the observable stream.`
  
  ```
  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
  ```



### Hwo it works 

Every time the user types in the textbox, the binding calls search() with the textbox value, a "search term". The searchTerms becomes an Observable emitting a steady stream of search terms.


The component **does not subscribe** to the **heroes$** observable. That's the job of the **AsyncPipe** in the template

**search(term: string)**: Subject .next(term)
  - tryggered av event 'keyup' ,, term = e.value
  - pushes a new search term into the observable stream
      * think of it as it will push new element "term" to a stream which will be sent to heroService.searchHeroes(term))
  - some of the terms will be discarded by distinctUntilChanged() 
  - som of the concurrently arrived results + in-flight res , will be discarded by switchMap()



**distinctUntilChanged** "grov forklaring"
  terms[1,2,2,3,3,1,1,1,2,2,2] after distinctUntilChanged => terms[1,2,3,1,2] 

**switchMap()** "grov forklaring"

sent

      req1

      req2

      req3

      req4

      req5

      req6
  
rcvd

  on 00:05 result_req1 + result_req3 ==> show result_req3 and **discard** both (result_req1 AND (result_req2 on arrive))
  
  on 00:07 result_req4               ==> show result_req4
  
  on 00:10 result_req5 + result_req6 ==> show result_req6 and discard result_req5
  

**this.heroes$** = (after waiting 300ms + removing adjecent duplicate value + switchMap)  the Observable rcvd from heroService.searchHeroes(term)

*****


### Extra:

**Subject**
>A Subject is both a source of observable values and an Observable itself. You can subscribe to a Subject as you would any Observable.
>
>You can also push values into that Observable by calling its next(value) method as the search() method does.


**switchMap**
>With the switchMap operator, every qualifying key event can trigger an HttpClient.get() method call. Even with a 300ms pause between requests, you could have multiple HTTP requests in flight and they may not return in the order sent.
>
>switchMap() preserves the original request order while returning only the observable from the most recent HTTP method call. Results from prior calls are canceled and discarded.
>
>Note that canceling a previous searchHeroes() Observable doesn't actually abort a pending HTTP request. Unwanted results are simply discarded before they reach your application code.




