# Branch5

# Routing
Use routing to navigate among different views and their components.

- Add the ability to navigate between the Heroes and Dashboard views.
- When users click a hero name in either view, navigate to a detail view of the selected hero.
- When users click a deep link in an email, open the detail view for a particular hero.

We will:
- Add the Angular router to navigate among different components.
- Turn the AppComponent into a navigation shell with `<a>` links and a `<router-outlet>`.
- Configure the router in an AppRoutingModule
- Define simple routes, a redirect route, and a parameterized route.
- Use the routerLink directive in anchor elements.
- Use router link parameters to navigate to the detail view of a user-selected hero.
- Share the HeroService among multiple components


### How to:

1- Create & configure the routing module
2- Add <router-outlet></router-outlet> to for ex. the root html tamplet


**Add the AppRoutingModule**

An Angular best practice is to load and configure the router in a separate, top-level module that is dedicated to routing and imported by the root AppModule.

`ng generate module app-routing --flat --module=app`

```
--flat puts the file in src/app instead of its own folder.
--module=app tells the CLI to register it in the imports array of the AppModule.
```

*app-routing.module.ts*

```
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
```

You generally don't declare components in a routing module so you can delete the @NgModule.declarations array and delete CommonModule references too.

You'll configure the router "AppRoutingModule" with Routes in the RouterModule so import those two symbols from the @angular/router library.

Initialize the router and start it listening for browser location changes
RouterModule.forRoot()

```
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
```

The method is called forRoot() because you configure the router at the application's root level. The forRoot() method supplies the service providers and directives needed for routing, and performs the initial navigation based on the current browser URL

**Add routes**

A typical Angular Route has two properties:

- **path**: a string that matches the URL in the browser address bar.
- **component**: the component that the router should create when navigating to this route.

Import the HeroesComponent so you can reference it in a Route.

```
import { SomeComponent1 }      from './something/some.component1';
import { SomeComponent2 }      from './something/some.component2';
```

Then define an array of routes with a single route to that component

```
const routes: Routes = [
  { path: 'somecomponent1', component: SomeComponent1 }
  { path: 'somecomponent2', component: SomeComponent2 }
]
```

**Add RouterOutlet**

Open the (AppComponent template)/(shell template) replace the <someComponent1> and <someComponent2> element with a <router-outlet> element.
src/app/app.component.html (router-outlet)

```
<!-- <someComponent1> </someComponent1> -->
<!-- <someComponent2> </someComponent2> -->

<h1>{{title}}</h1>
<router-outlet></router-outlet>
<app-messages></app-messages>
```

The router will insert *someComponent1/someComponent2*, instead of **<router-outlet>** depending on the URI

- You can Add a navigation link 

  ```
  <nav>
    <a routerLink="/someComponent1">Heroes</a>
  </nav>

  <h1>{{title}}</h1>
  <router-outlet></router-outlet>
  <app-messages></app-messages>

  ```

A routerLink attribute is set to "/someComponent1", the string that the router matches to the route to someComponent1. The routerLink is the selector for the RouterLink directive that turns user clicks into router navigations. It's another of the public directives in the RouterModule

**Add a default route** 

To make the app navigate to the "somecomponent1" automatically when starting, add the following route to the AppRoutingModule.Routes array.
This route redirects a URL that fully matches the empty path to the somecomponent1
{ path: '', redirectTo: '/somecomponent1', pathMatch: 'full' },


### Parameterized route 


**Routable HeroDetailComponent**

Previously, the parent HeroesComponent set the HeroDetailComponent.hero property and the HeroDetailComponent displayed the hero.

HeroesComponent doesn't do that anymore. Now the router creates the HeroDetailComponent in response to a URL such as ~/detail/11.

The HeroDetailComponent needs a new way to obtain the hero-to-display.

- Get the route that created it.
- Extract the id from the route
- Acquire the hero with that id from the server via the HeroService

*__Edit__ hero-detail.component.ts*

```
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../hero.service';

constructor(
  private route: ActivatedRoute,
  private heroService: HeroService,
  private location: Location
) {}
```

The **ActivatedRoute** holds information about the route to this instance of the HeroDetailComponent. This component is interested in the route's bag of parameters extracted from the URL. The "id" parameter is the id of the hero to display.

The **HeroService** gets hero data from the remote server and this component will use it to get the hero-to-display.

The **location** is an Angular service for interacting with the browser. You'll use it later to navigate back to the view that navigated here

```
ngOnInit() {
    this.getHero();
  }
  getHero(): void{
    const id = +this.route.snapshot.paramMap.get("id");

    const observer = {
      next: (fetched_hero)=> this.heroDetails = fetched_hero
    }
    this.heroService.getHero(id).subscribe(observer);
  }
```

The **route.snapshot** is a static image of the route information shortly after the component was created.

The **paramMap** is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch.

**Route parameters** are always strings. *The JavaScript (+) operator* converts the string to a number, which is what a hero id should be.



**implement HeroService.getHero(id: number)**

... return of(HEROES.find(hero => hero.id === id)); ...


**Add a hero detail route**

*app-routing.module.ts*

A URL like ~/detail/11 would be a good URL for navigating to the Hero Detail view of the hero whose id is 11

```
const routes: Routes = [ 
  ...
  { path: 'detail/:id', component: HeroDetailComponent },
  ...
]
```

**Edit:**

*dashboard.component.html* 

```
<a *ngFor="let hero of heroes" class="col-1-4"
    routerLink="/detail/{{hero.id}}">
```

**Edit:**

*heroes.component.html* 

`<a routerLink="/detail/{{hero.id}}">`

**Remove**

*heroes.component.html* 

`<app-hero-detail [heroDetails]="selectedHero" (deleteRequest)="deleteHero($event)"> </app-hero-detail>`


**Remove**

*heroes.component.ts* 

The **onSelect()** method and **selectedHero** property are no longer used.

**Remove**

*hero-detail.component.ts*

importing of: Output, EventEmitter
@output deleteRequest


#### Find the way back / navigate back

By clicking the browser's back button, you can go back to the hero list or dashboard view, depending upon which sent you to the detail view

hero-detail.component.html 
`<button (click)="goBack()">go back</button>`

hero-detail.component.ts 
```
goBack(): void {
  this.location.back();
}

```
