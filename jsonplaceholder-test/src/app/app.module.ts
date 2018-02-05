import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppNavbarModule } from 'bootstrap-header';
import { MenuItem } from 'bootstrap-header/src/app/app-navbar/app-navbar.component';
import { HomeComponent } from './home/home.component';
import { AlbumsComponent } from './albums/albums.component';
import { PhotosComponent } from './photos/photos.component';
import { LoggerService } from './logger.service';
import { DataService } from './data.service';
import { HttpModule } from '@angular/http';
import { FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumsComponent,
    PhotosComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    AppNavbarModule,
    HttpModule
  ],
  exports: [AppNavbarModule],
  providers: [
    DataService,
    LoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
