import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MuuriComponent } from './muuri.component';
import { ItemMuuriComponent} from './item-muuri.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, MuuriComponent, ItemMuuriComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
