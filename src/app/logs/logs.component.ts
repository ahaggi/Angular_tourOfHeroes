import { Component, OnInit } from '@angular/core';
import { LogService } from '../log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  //The logService property must be public because you're about to bind/use to it in the template.
  constructor(public logService: LogService) {}


  ngOnInit() {
  }

}
