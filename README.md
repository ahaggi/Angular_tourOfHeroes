# Branch3

## By the end of the tutorial you will be able to do the following:
- Use _**service-in-service**_ , you inject the *LogService* into the *HeroService* which is injected into the *HeroesComponent*.

You'll create a **LogService** for saving logs to be displayed, and inject it in two places:

 1- in *HeroService* which uses **LogService** to send a log.
 
 2- in *LogsComponent* which displays that log from **LogService**.

When HeroService fetches the Heroes list:

  - HeroService add Msg to the LogService

  - HeroService can access the logs by injecting LogService into the HeroService.

  - LogsComponent displays logs at the bottom of the screen.

  - display a log in LogsComponent when HeroService fetches heroes successfully.


### How to:

* Create LogsComponent

    `ng generate component logs`


* Modify *AppComponent* template to display the generated LogsComponent
    ```	
        ...
    	<app-logs></app-logs>
    	...
    ```

* Create the **LogService**

    `ng generate service log`

	The service has two methods: one to add() a log to the cache "array" and another to clear() the array


* Inject LogService into the HeroService
    ```
    import { LogService } from './log.service';
    constructor(private logService: LogService) { }
    ```
    >This is a typical *__service-in-service__* , you inject the *LogService* into the *HeroService* which is injected into the *HeroesComponent*.

* Send a log from HeroService

	Modify the **getHeroes** method to send a log when the heroes are fetched
    ```
    getHeroes(): Observable<Hero[]> {
    	...
    	this.logService.add('HeroService: fetched heroes');
    	...
    }
    ```

* Display the log from *HeroService* in the LogsComponent 

	The LogsComponent should display all logs
	
	*logs.component.ts* 
    ```
    import { LogService } from '../log.service';
    constructor(**public** logService: LogService) {}
    ```	
    >*compatiblity with AOT (Ahead Of Time)* 
    >The logService property must be *public* because you're about to *bind/use* it in the template.
    *Angular only binds to public component properties*

* (Bind to)/ use the LogService in logs.component.html




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
