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
export class MuuriComponent implements OnInit, AfterViewInit  {

  private items: QueryList<ItemMuuriComponent> = new QueryList<ItemMuuriComponent>();
  private grid: Muuri;

  constructor(private ref: ElementRef){}
  ngOnInit(){
    
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
      dragStartPredicate: {
        handle: '.item-muuri-header'
      },
      dragContainer: element,
      dragReleaseDuration: 400,
      dragReleaseEasing: 'ease',
      dragCssProps: {
        touchAction: 'none',
        userSelect: 'none',
        userDrag: 'none',
        tapHighlightColor: 'rgba(0, 0, 0, 0)',
        touchCallout: 'none',
        contentZooming: 'none'
      },
      dragPlaceholder: {
        enabled: true,
        duration: 300,
        easing: 'ease',
        createElement: null,
        onCreate: null,
        onRemove: null
      },
      itemHiddenClass: 'muuri-item-hidden',
    });
  }
  removeItem(item){
    const i = this.items.find( (value) => {
      return item.id === value.id;
    })
    if (i){
      this.grid.remove(i.element);
    }
  }
  resizeItem(item){
    this.grid.layout();
    this.grid.refreshItems();
  }
}