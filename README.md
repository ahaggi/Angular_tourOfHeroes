
# Branch2

## By the end of the tutorial you will be able to do the following:

Create a shared service to assemble the heroes.

********************************************************************************************************

### Why services

Components shouldn't fetch or save data directly and they certainly shouldn't knowingly present fake data. They should focus on presenting data and delegate data access to a **service**.

You'll create a **HeroService** and inject it in **HeroesComponent**

**How to:**

- **Create the HeroService**

    `ng generate service hero`

- **Implement the hero list**

  Get the list from external server or from mock-data.

- **Provide the HeroService**

	Now, you need to make sure that the HeroService is registered as the provider of this service. You are registering it with an injector, which is the object that is responsible for choosing and injecting the provider where it is required. 

	By default, the Angular CLI command ng generate service registers a provider with the root injector for your service by including provider metadata in the @Injectable decorator.

	*hero.service.ts*
  ```
    @Injectable({
      providedIn: 'root'
    })
  ```
  
	When you provide the service at the root level, Angular creates **a single**, shared instance of HeroService and injects into any class that asks for it. Registering the provider in the @Injectable metadata also allows Angular to optimize an app by removing the service if it turns out not to be used after all. 

- **Use the service in the other components for ex. HeroesComponent**

  *heroes.component.ts*

	1- import { HeroService } from '../hero.service';
  
	2- Inject HeroService in the constructor
		constructor(private heroService: HeroService) { } 
    
- **getData async**

    If the data is fetched from a server, the HeroService must wait for the server to respond, getHeroes() cannot return immediately with hero data, and the browser will not block while the service waits.
    
    It can take a *callback*. It could return a *Promise*. It could return an *Observable*
    
    Angular's **HttpClient methods** return RxJS Observables. In this tutorial, you'll simulate getting data from the server with the RxJS of() function

    *hero.service.ts*

    ```
    getHeroes(): Observable<Hero[]> {
      return of(HEROES);   
      // OBS of(HEROES) returns an Observable<Hero[]> that emits a single value, 
      // the array of mock heroes.
    }
    ```

    *heroes.component.ts*

    ```
    getHeroes(): void {
      this.heroService.getHeroes()
          .subscribe(heroes => this.heroes = heroes);
    }
    ```
    this will wait for the Observable to emit the array of heroes— which could happen now or several minutes from now. Then subscribe passes the emitted array to the callback, which sets the component's heroes property.
    
    >   Promise vs Observable
    >   https://stackoverflow.com/a/37365955






# AngularTourOfHeroes


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
