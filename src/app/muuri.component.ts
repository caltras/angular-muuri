import { Component, Directive, OnInit, ElementRef, AfterViewInit, AfterContentInit, ViewChildren, QueryList, ContentChildren } from '@angular/core';
import {ItemMuuriComponent} from './item-muuri.component';
import Muuri from 'muuri';

@Component({
  selector: '[muuri]',
  template: `<ng-content></ng-content>`,
  queries: {
    items: new ContentChildren(ItemMuuriComponent),
  }
})
export class MuuriComponent implements OnInit, AfterViewInit, AfterContentInit  {

  private items: QueryList<ItemMuuriComponent> = new QueryList<ItemMuuriComponent>();
  private grid: Muuri;

  constructor(private ref: ElementRef){}
  ngOnInit(){
    this.items.changes.subscribe( () =>{
      console.log("Changed ")
    });
  }
  ngAfterViewInit(){
    var element = this.ref.nativeElement;
   
    this.grid = new Muuri(element, {
      items: this.items.map((el: ItemMuuriComponent) => el.element),
      layout: {
        fillGaps: true,
        rounding: true
      },
      layoutDuration: 400,
      layoutEasing: 'ease',
      dragEnabled: true,
      dragSortInterval: 0,
      dragContainer: document.body,
      dragReleaseDuration: 400,
      dragReleaseEasing: 'ease'
    });
  }
  ngAfterContentInit(){

  }
}