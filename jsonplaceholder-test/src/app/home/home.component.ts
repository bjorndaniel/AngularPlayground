import { Component, Input } from '@angular/core';
import { DataService } from '../data.service';
import { LoggerService } from '../logger.service';
import { FileType } from '../model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  FileType = FileType;
  constructor(
    private logger: LoggerService,
    private dataService: DataService
  ) {}
  @Input() searchString: string;

  download(type: FileType) {
    this.dataService.downloadFile('', type);
  }
}
