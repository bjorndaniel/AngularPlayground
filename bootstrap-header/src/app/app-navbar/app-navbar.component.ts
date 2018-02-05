import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent {
  MenuItem = MenuItem;
  selectedItem = MenuItem.Home;
  searchString: string;
  @Output() navigate = new EventEmitter<MenuItem>();
  @Output() search = new EventEmitter<string>();

  menuClick(item: MenuItem) {
    this.selectedItem = item;
    this.navigate.emit(item);
  }
  searchClick() {
    this.search.emit(this.searchString);
  }
}

export enum MenuItem {
  Home = 1,
  Albums,
  Photos,
  Posts,
  Comments
}
