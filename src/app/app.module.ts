import { ViewerComponent } from './viewer-component/viewer.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
