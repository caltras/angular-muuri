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
  size: number = 5;
  colors = ["blue","green", "gray", "red", "yellow"];
  items = [];

  @ViewChild(MuuriComponent, {static: true})
  grid: MuuriComponent;

  
  ngOnInit(){
    console.log(this.grid);
    for(let i=0; i <this.size; i++){
      let height = Math.random()*1000
      height = height < 400 ? 400 : height;
      let width = Math.random()*1000
      width = width < 200 ? 200 : width;
      let id = i;
      this.items.push({id, width, height});
    }
    setTimeout( ()=>{
      for(let i=0; i <this.size; i++){
        this.createChart('chart-'+i);
      }
    }, 1000);
  }
  removeItem(item){
    console.log(item);
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
  createChart(id){
    Highcharts.chart(id, {

          title: {
              text: 'Solar Employment Growth by Sector, 2010-2016'
          },

          subtitle: {
              text: 'Source: thesolarfoundation.com'
          },

          yAxis: {
              title: {
                  text: 'Number of Employees'
              }
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
          },

          plotOptions: {
              series: {
                  label: {
                      connectorAllowed: false
                  },
                  pointStart: 2010
              }
          },

          series: [{
              name: 'Installation',
              data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
          }, {
              name: 'Manufacturing',
              data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
          }, {
              name: 'Sales & Distribution',
              data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
          }, {
              name: 'Project Development',
              data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
          }, {
              name: 'Other',
              data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
          }],

          responsive: {
              rules: [{
                  condition: {
                      maxWidth: 500
                  },
                  chartOptions: {
                      legend: {
                          layout: 'horizontal',
                          align: 'center',
                          verticalAlign: 'bottom'
                      }
                  }
              }]
          }

      });
  }
}
