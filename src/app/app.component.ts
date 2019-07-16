import { Component, OnInit, ViewChild } from '@angular/core';
import Muuri from 'muuri';
import Highcharts from 'highcharts';
import { MuuriComponent }  from './muuri.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'Angular';
  size: number = 20;
  colors = ["blue","green", "gray", "red", "yellow"];
  items = [];

  @ViewChild(MuuriComponent, {static: true})
  grid: MuuriComponent;

  
  ngOnInit(){
    for(let i=0; i <this.size; i++){
      let height = Math.random()*500;
      height = height < 400 ? 400 : height;
      let width = Math.random()*1000
      width = width < 200 ? 200 : width;
      let id = i;
      this.items.push({id, width, height});
    }
  }
  removeItem(item){
    if(this.grid){
      const idx = this.items.findIndex( (value) => {
        return item.id === value.id;
      });
      if(idx > -1) {
        this.items.splice(idx,1);
      }
      this.grid.removeItem(item);
    }
    
  }
}
