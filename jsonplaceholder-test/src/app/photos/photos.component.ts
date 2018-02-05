import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { LoggerService } from '../logger.service';
import { Photo } from '../model';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  photos: Photo[];
  isBusy = false;

  constructor(
    private dataService: DataService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.getPhotos();
  }

  getPhotos() {
    this.photos = null;
    this.isBusy = true;
    this.dataService.getPhotos().subscribe(
      p => {
        this.isBusy = false;
        this.photos = p.slice(0, 25);
      },
      (error: string) => {
        this.isBusy = false;
        this.logger.log(error);
      }
    );
  }
}
