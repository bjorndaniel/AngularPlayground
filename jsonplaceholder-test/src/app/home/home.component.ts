import { Component, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { LoggerService } from '../logger.service';
import { saveAs } from 'file-saver/FileSaver';
import { FileType } from '../model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private http: Http, private logger: LoggerService) {}
  @Input() searchString: string;

  pdf() {
    this.logger.log('clicked pdf');
    this.http
      .get('http://localhost:5000/api/files/pdf', {
        responseType: ResponseContentType.Blob
      })
      .subscribe(response => {
        this.saveFile(response, FileType.Pdf);
      });
  }

  excel() {
    this.logger.log('clicked excel');
    this.http
      .get('http://localhost:5000/api/files/excel', {
        responseType: ResponseContentType.Blob
      })
      .subscribe(response => {
        this.saveFile(response, FileType.Excel);
      });
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
