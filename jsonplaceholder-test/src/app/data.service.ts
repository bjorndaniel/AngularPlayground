import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Album, Photo } from './model';
import { LoggerService } from './logger.service';

@Injectable()
export class DataService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http, private logger: LoggerService) {}

  getAlbums(): Observable<Album[]> {
    return this.http
      .get(`${this.baseUrl}albums`)
      .map(response => response.json() as Album[])
      .do(a => this.logger.log(`Got ${a.length} albums`))
      .catch(error => this.handleError(error));
  }

  getPhotos(): Observable<Photo[]> {
    return this.http
      .get(`${this.baseUrl}photos`)
      .map(response => response.json() as Photo[])
      .do(a => this.logger.log(`Got ${a.length} photos`))
      .catch(error => this.handleError(error));
  }

  private handleError(error: any): Observable<any> {
    this.logger.log(`An error occurred: ${error}`); // for demo purposes only
    return Observable.throw('Something bad happened; please check the console');
  }
}
