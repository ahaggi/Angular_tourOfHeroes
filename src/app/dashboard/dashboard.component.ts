import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService) { }

  ngOnInit() {

    this.getHero();

  }


  getHero(): void {
    var observer = {
      next: (arry) => {
        this.heroes = arry
      },
      complete: () => console.log('Observer got a complete notification: dashboard.component'),

    };
    this.heroService.getHeroes().subscribe(observer

    );

  }
}
