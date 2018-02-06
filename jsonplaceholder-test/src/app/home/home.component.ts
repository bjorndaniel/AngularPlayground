import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { LoggerService } from '../logger.service';
import { FileType } from '../model';
import { HubConnection } from '@aspnet/signalr-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private _hubConnection: HubConnection;
  public async: any;
  message = '';
  messages: string[] = [];
  FileType = FileType;

  constructor(
    private logger: LoggerService,
    private dataService: DataService
  ) {}

  @Input() searchString: string;

  ngOnInit(): void {
    this._hubConnection = new HubConnection('http://localhost:5000/test');
    this._hubConnection.on('Send', (data: any) => {
      const received = `Received: ${data}`;
      this.messages.push(received);
    });

    this._hubConnection
      .start()
      .then(() => {
        this.logger.log('Hub connection started');
      })
      .catch(err => {
        this.logger.log('Error while establishing connection');
      });
  }

  sendMessage(): void {
    const data = `Sent: ${this.message}`;
    this._hubConnection.invoke('Send', data);
    this.messages.push(data);
  }

  download(type: FileType) {
    this.dataService.downloadFile('', type);
  }
}
