import { NgModule } from '@angular/core';
import { MuuriComponent } from './muuri.component';
import { ItemMuuriComponent } from './item-muuri.component';

@NgModule({
  declarations: [MuuriComponent, ItemMuuriComponent],
  imports: [
  ],
  exports: [MuuriComponent, ItemMuuriComponent]
})
export class AngularMuuriModule { }
