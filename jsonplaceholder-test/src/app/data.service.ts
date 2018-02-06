import { Injectable } from '@angular/core';
import { Headers, Http, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { saveAs } from 'file-saver/FileSaver';

import { Album, Photo, FileType } from './model';
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

  downloadFile(name: string, type: FileType) {
    this.logger.log(`Downloading ${FileType[type]}`);
    this.http
      .get(`http://localhost:5000/api/files/${FileType[type]}`, {
        responseType: ResponseContentType.Blob
      })
      .subscribe(response => {
        this.saveFile(response, type);
      });
  }

  private handleError(error: any): Observable<any> {
    this.logger.log(`An error occurred: ${error}`); // for demo purposes only
    return Observable.throw('Something bad happened; please check the console');
  }

  private saveFile(response, type: FileType) {
    const fileType =
      type === FileType.Pdf
        ? 'application/pdf'
        : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const blob = new Blob([response.blob()], { type: fileType });
    const contentDispositionHeader: string = response.headers.get(
      'Content-Disposition'
    );
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1];
    saveAs(blob, filename);
  }
}
