
# Branch1
## By the end of the tutorial you will be able to do the following:
* Use built-in Angular **`directives`** to show and hide elements and display lists of hero data.

* Create Angular components to display hero details and show an array of heroes.
    `ng generate component heroes`

* Use `one-way` data binding for read-only data.

* Add editable fields to update a model with two-way data binding.
    - Although ngModel is a valid Angular directive, it isn't available by default. It belongs to the optional FormsModule and you must opt-in to using it.
```
        import { FormsModule } from '@angular/forms'; 
        @NgModule({
        ...
        imports: [FormsModule],
        })
```
* Bind component methods to user events, like keystrokes and clicks.

* Enable users to select a hero from a master list and edit that hero in the details view.
    
* Format data with pipes.  
    `<h2>{{hero.name | uppercase}} Details</h2>`
    Pipes are a good way to format strings, currency amounts, dates and other display data. Angular ships with several  built-in pipes and you can create your own.

 
### Install angular/cli
`npm install -g @angular/cli`




### Create a new application
`ng new angular-tour-of-heroes`
Will create the root **NgModule** and the the **root component**.

The Angular CLI generated a new project with a default application and supporting files.

You can add pre-packaged functionality to a new project by using the ng add command. The ng add command transforms a project by applying the schematics in the specified package. For more information, see the Angular CLI documentation.

Angular Material provides schematics for typical app layouts. See the Angular Material documentation for details.


### Create a new component.

`ng generate component heroes`

Will create new componenet **heroes** and declares the HeroesComponent in the **@NgModule.declarations** array.

`
declarations: [
  AppComponent,
  HeroesComponent
]
`

*Every component must be declared in exactly one NgModule.*
 

### run the application
`ng serve --open`


***************************************************************


- Dashes work just as well

  weqeqweqweqwe

- And if you have sub points, put two spaces before the dash or star:
  - Like this
  
    weqeqweqweqwe
    
  - And this
  
  
 
### App sturcture

**App folder:**

- AppModule

  declare(component1 + all the "childern" components)

- component:*Component1.ts*
  
- view: *Component1.html* will contain child-components as selector/Tag for eks componenet2 **<app-heroes></app-heroes>**

- component2 folder:
  
  - component:Component2.ts 

			```@Component({
  					selector: 'app-heroes', ...
      ```

   - view: Component2.html
		
**To embed component2 in component1:**

1. "Declare" component2 in AppModule
2. add `<component2>`-tag til view: *Component1.html*



### CSS
You could add more styles to styles.css and keep growing that stylesheet as you add components.

You may prefer instead to define private styles for a specific component and keep everything a component needs— the code, the HTML, and the CSS —together in one place.

This approach makes it easier to re-use the component somewhere else and deliver the component's intended appearance even if the global styles are different.

**Binding conditional css classes:**

`<div [class.cssClassname]="bool"> ... </div>`

If we want to set a **cssClass conditianally** on an element for ex.  `<div class="selected"> ... </div>` when `"hero === selectedHero"` we can do the flwg:

`<div [class.selected]="hero === selectedHero"> ... </div>`

When the hero is the same as the selectedHero, Angular adds the selected CSS class. When the two heroes are different, Angular removes the class.




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
