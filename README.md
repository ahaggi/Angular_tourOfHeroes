# Branch3

## By the end of the tutorial you will be able to do the following:
- Use _**service-in-service**_ , you inject the *MessageService* into the *HeroService* which is injected into the *HeroesComponent*.

You'll create a **MessageService** for saving messages to be displayed, and inject it in two places:

 1- in *HeroService* which uses the service to send a message.
 2- in *MessagesComponent* which displays that message.

When HeroService fetches fetches the Heroes list:
    - HeroService add Msg to the MessageService
    - HeroService can access the messages by injecting MessageService into the HeroService.
    - MessagesComponent displays messages at the bottom of the screen.
	- display a message in MessagesComponent when HeroService fetches heroes successfully.


### How to:

* Create MessagesComponent

    `ng generate component messages`


* Modify *AppComponent* template to display the generated MessagesComponent
    ```	
        ...
    	<app-messages></app-messages>
    	...
    ```

* Create the **MessageService**

    `ng generate service message`

	The service has two methods: one to add() a message to the cache "array" and another to clear() the array


* Inject MessageService into the HeroService
    ```
    import { MessageService } from './message.service';
    constructor(private messageService: MessageService) { }
    ```
    >This is a typical *__service-in-service__* , you inject the *MessageService* into the *HeroService* which is injected into the *HeroesComponent*.

* Send a message from HeroService

	Modify the **getHeroes** method to send a message when the heroes are fetched
    ```
    getHeroes(): Observable<Hero[]> {
    	...
    	this.messageService.add('HeroService: fetched heroes');
    	...
    }
    ```

* Display the message from *HeroService* in the MessagesComponent 

	The MessagesComponent should display all messages
	
	*messages.component.ts* 
    ```
    import { MessageService } from '../message.service';
    constructor(**public** messageService: MessageService) {}
    ```	
    >*compatiblity with AOT (Ahead Of Time)* 
    >The messageService property must be *public* because you're about to *bind/use* it in the template.
    *Angular only binds to public component properties*

* (Bind to)/ use the MessageService in messages.component.html




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
