import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Album } from '../model';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})

export class AlbumsComponent implements OnInit {
  isBusy = false;
  albums: Album[];
  constructor(
    private dataService: DataService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums(): any {
    this.albums = null;
    this.isBusy = true;
    this.dataService.getAlbums().subscribe(
      a => {
        this.isBusy = false;
        this.albums = a;
      },
      (error: string) => {
        this.isBusy = false;
        this.logger.log(error);
      }
    );
  }
}
