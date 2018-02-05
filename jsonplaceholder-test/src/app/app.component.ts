import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'bootstrap-header/src/app/app-navbar/app-navbar.component';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  selectedPage: MenuItem;
  searchString: string;
  constructor(private logger: LoggerService) {}
  ngOnInit(): void {
    this.selectedPage = 1;
  }
  navigate(item: MenuItem) {
    this.selectedPage = item;
    console.log(`Selected ${item}`);
  }
  search(text: string) {
    this.logger.log(`Searching for ${text}`);
    this.searchString = text;
  }
}
