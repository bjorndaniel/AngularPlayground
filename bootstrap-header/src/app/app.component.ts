import { Component } from '@angular/core';
import { MenuItem } from './app-navbar/app-navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  selected = MenuItem.Home;
  searchString: string;
  navigate(item: MenuItem) {
    this.selected = item;
  }
  search(text: string) {
    console.log(`emitted ${text}`);
    this.searchString = text;
  }
}
