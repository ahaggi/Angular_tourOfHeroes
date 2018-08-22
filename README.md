# Branch4


# Master/Detail Components  + Binding diffrent Components input/output + costum events + Dashboard


## 1- Master/Detail Components  + Binding diffrent Components input/output + costum events
Keeping all features in one component as the application grows will not be maintainable. You'll want to split up large components into smaller sub-components, each focused on a specific task or workflow.

Refactoring the original HeroesComponent into two components yields benefits, both now and in the future:

- You simplified the HeroesComponent by reducing its responsibilities.
- You can evolve the HeroDetailComponent into a rich hero editor without touching the parent HeroesComponent.
- You can evolve the HeroesComponent without touching the hero detail view.
- You can re-use the HeroDetailComponent in the template of some future component.

**Make the HeroDetailComponent**


`ng generate component hero-detail`


*HeroDetailComponent.ts*
Amend the @angular/core import statement to include the Input symbol.

```
import { Component, OnInit, Input } from '@angular/core';

//Add the @Input() heroDetails property
@Input() heroDetails: Hero;
```

That's the only change you should make to the HeroDetailComponent class. There are no more properties. There's no presentation logic. This component simply receives a Hero object through its "heroDetails" property and displays it.


**Update the HeroesComponent template**

*heroes.component.html*

`<app-hero-detail [heroDetails]="selectedHero"></app-hero-detail>`


Now when the user clicks a hero in the list, the selectedHero changes. When the selectedHero changes, the property binding updates hero and the HeroDetailComponent displays the new hero.

**Implement custum event**

- *HeroDetailComponent.ts*

    ```
    @Output() deleteRequest = new EventEmitter<Hero>();
    
    delete() {
    this.deleteRequest.emit(this.heroDetails);
    }
    ```

- *heroes.component.html* 

`<app-hero-detail ...  (deleteRequest)="deleteHero($event)" ></app-hero-detail>`

- *heroes.component.html* 

    ```
     deleteHero(hero: Hero): void {
        this.heroService.deleteHero(hero);
        // this.heroes and heroService.heroes is the same object
        // if myobserver was = {
          //next: heroes => this.heroes = hs.slice() 
        // }
        // then this.hero and heroService.heroes will be 2 diff arrays and add:
        // this.getHeroes(); to update this.heroes
      }
    ```


## 2- Dashboard view

**Add a Dashboard view.**

`ng generate component dashboard`

**import heroService and get heroes**


```
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService) { }


  ngOnInit() {
    this.getHeroes();
  }
 
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(hs => this.heroes = hs
      // OBS this.heroes and heroService.heroes will refer to the same obj
      // Altern. you can clone the heroes
      // heroes => this.heroes = heroes.slice(1, 5);
  }
```
**add dashboard to app.component**
*app.component.html*
`<app-dashboard></app-dashboard>`


*********************


### Custom events with EventEmitter "ligner på QT slot/signal"

The directive creates an EventEmitter and exposes it as a property. The directive calls EventEmitter.emit(payload) to fire an event, passing in a message payload, which can be anything. Parent directives listen for the event by binding to this property and accessing the payload through the $event object.

*component2.html*

```
	<div>
	...
	  <button (click)="delete()">Delete</button>
	</div>
```

*component2.ts* **This component makes a request but it *can't actually delete* a hero.**

```
	 foo:Foo;
	 @Output() deleteRequest = new EventEmitter<Foo>();  //OBS @output

	delete() {
	  this.deleteRequest.emit(this.foo);
	}
```

The component defines a deleteRequest property that returns an EventEmitter. When the user clicks delete, the component invokes the delete() method, telling the EventEmitter to emit a Foo object.

*component1.html*

`<component2 (deleteRequest)="someFuncInComponent1($event)"></component2>`

*component1.ts*

```
someFuncInComponent1(foo: Foo): void {
  console.log(foo);
}
```

****

### Input and Output properties

An Input property is a settable property annotated with an @Input decorator. Values flow into the property when it is data bound with a property binding

An Output property is an observable property annotated with an @Output decorator. The property almost always returns an Angular EventEmitter. Values flow out of the component as events bound with an event binding.

**Binding to a different component**

You can also bind to a property of a different component. In such bindings, the other component's property is to the left of the (=).

It's OK for a component to bind to its own properties. The component author is in complete control of those bindings.

But other components shouldn't have that kind of unrestricted access. You'd have a hard time supporting your component if anyone could bind to any of its properties. Outside components should only be able to bind to the component's public binding API.

You can't use the TypeScript public and private access modifiers to shape the component's public binding API.
Angular requires some other way to identify properties that outside components are allowed to bind to. That other way is the @Input() and @Output() decorators.

In the following example, the AppComponent template binds someComponent1 class members to properties of the someComponent2 whose selector is 'component2'.

*component1.ts*

```
foo_1:string;
constructor(){}
deleteHandler(v:string)=>{....}
```

*component1.html*

```
<component2 [foo_2]="foo_1" (deleteRequest)="deleteHandler($event)"> 
// component2.foo_2 = component1.foo_1 and listen to event component2.deleteRequest
```

![Image of Yaktocat](https://angular.io/generated/images/guide/template-syntax/input-output.png)
