import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularMuuriModule } from 'angular-muuri';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularMuuriModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
