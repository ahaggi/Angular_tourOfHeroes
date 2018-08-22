# Branch6

You'll add the following data persistence features with help from Angular's HttpClient.

- The HeroService gets hero data with HTTP requests.
- Users can add, edit, and delete heroes and save these changes over HTTP.


### Enable HTTP services

HttpClient is Angular's mechanism for communicating with a remote server over HTTP.

To make HttpClient available everywhere in the app:

- open the root AppModule
- import the HttpClientModule symbol from @angular/common/http and add it to @NgModule.imports.

app.module.ts 

```
import { HttpClientModule }    from '@angular/common/http';
add it to the @NgModule.imports array
```


***

### Simulate a data server  In-memory Web API 

After installing the module, the app will make requests to and receive responses from the HttpClient without knowing that the In-memory Web API is intercepting those requests, applying them to an in-memory data store, and returning simulated responses.


> Important: the In-memory Web API module has nothing to do with HTTP in Angular.
>
> If you're just reading this tutorial to learn about HttpClient, you can skip over this step. If you're coding along with this tutorial, stay here and add the In-memory Web API now.

**Install the In-memory Web API package from npm**

`npm install angular-in-memory-web-api --save`

**create in-memory-data.service.ts** 

`ng generate service InMemoryData`


```
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes_1 = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {heroes_1};
  }
}

```



**Edit app.module.ts** 
```
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
...
imports: [
  ...
  HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService, { dataEncapsulation: false }
      )
    ],
})
```


************************

**Now back to the HttpClient story.**

**Edit**

*hero.service.ts* 

```
import { HttpClient, HttpHeaders } from '@angular/common/http';
...
private heroesUrl = 'api/heroes_1';  // URL is 'api/' +   returned obj from InMemoryDataService.createDb() 
...
  getHeroes(): Observable<Hero[]> {
    // This particular HttpClient.get call returns an Observable<Hero[]>, literally "an observable of hero arrays".
    // In practice, it will only return a single hero array.
    return this.http.get<Hero[]>(this.heroesUrl)
  }
  private log(message: string) {
    this.logService.add(`HeroService: ${message}`);
  }
...
```

**HttpClient.get returns response data**

HttpClient.get returns the body of the response as an untyped JSON object by default. Applying the optional type specifier, <Hero[]> , gives you a typed result object


>Other APIs may bury the data that you want within an object. You might have to dig that data out by processing the Observable result with the RxJS map operator.
>
>Although not discussed here, there's an example of map in the getHeroNo404() method included in the sample source code.


#### RxJS operators

- **Error handling** 

To catch errors, you "pipe" the observable result from http.get() through an RxJS catchError() operator.

- **RxJS tap operator**

RxJS tap operator: which looks at the observable values, does something with those values, and passes them along. The tap call back doesn't touch the values themselves


Import the catchError , tap .. symbols from rxjs/operators, along with some other operators you'll need later.

**Edit**
*hero.service.ts* 

```
getHeroes (): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl)

    .pipe(
      tap(heroes => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    );
    
}

```


The *catchError()* operator intercepts an Observable that failed. It passes the error an error handler that can do what it wants with the error.

**handleError**
*Se på errorHandler implementasjon*

The heroes web API expects a special header in HTTP save requests. That header is in the httpOptions constant defined in the HeroService.

```
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

```

**Get hero by id**
There are three significant differences from getHeroes().

- it constructs a request URL with the desired hero's id.
- the server should respond with a single hero rather than an array of heroes.
- therefore, getHero returns an Observable<Hero> ("an observable of Hero objects") rather than an observable of hero arrays 

**Update heroes**
*HeroService.updateHero*

The overall structure of the updateHero() method is similar to that of getHeroes(), but it uses http.put() to persist the changed hero on the server


**Add a new hero**

*HeroService.addHero() differs from updateHero in two ways.*

- it calls HttpClient.post() instead of put().
- it expects the server to generates an id for the new hero, which it returns in the Observable<Hero> to the caller.

```
...
this.heroService.addHero({ name } as Hero)  cast {name} as Hero obj
...
```



**Delete a hero**

Note that

- it calls HttpClient.delete.
- the URL is the heroes resource URL plus the id of the hero to delete
- you don't send data as you did with put and post.
- you still send the httpOptions
    
In *heroes.component.ts*, each hero in the heroes list should have a delete button
