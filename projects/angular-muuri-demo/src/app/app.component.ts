import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular';
  size = 5;
  colors = ['blue', 'green', 'gray', 'red', 'yellow'];
  items = [];

  @ViewChild('grid')
  grid: any;

  ngOnInit() {
    for (let i = 0; i < this.size; i++) {
      let height = Math.random() * 500;
      height = height < 400 ? 400 : height;
      let width = Math.random() * 1000;
      width = width < 200 ? 200 : width;
      const id = i;
      this.items.push({id, width, height});
    }
  }
  removeItem(item) {
    if (this.grid) {
      const idx = this.items.findIndex( (value) => {
        return item.id === value.id;
      });
      if (idx > -1) {
        this.items.splice(idx, 1 );
      }
      this.grid.removeItem(item);
    }
  }
}
