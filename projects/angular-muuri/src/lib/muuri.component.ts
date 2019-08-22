import { Component, Directive, OnInit, ElementRef, AfterViewInit, QueryList, ContentChildren, Input, Optional } from '@angular/core';
import {ItemMuuriComponent} from './item-muuri.component';
import Muuri from 'muuri';
import { forkJoin, timer, race, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
const defaultOptions = {
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
  dragReleaseDuration: 400,
  dragReleaseEasing: 'ease',
  dragPlaceholder: {
    enabled: true,
    duration: 300,
    easing: 'ease',
    createElement: (item) => {
      return item.getElement().cloneNode(true);
    }
  }
};


@Component({
  selector: '[muuri-grid]',
  template: `<ng-content></ng-content>`,
  styles: [`
  :host {
    position: relative;
  }`],
  queries: {
    items: new ContentChildren(ItemMuuriComponent),
  }
})
export class MuuriComponent implements OnInit, AfterViewInit  {

  private items: QueryList<ItemMuuriComponent> = new QueryList<ItemMuuriComponent>();
  private grid: Muuri;

  @Optional()
  @Input()
  options: any;

  constructor(private ref: ElementRef){}
  ngOnInit() {}

  ngAfterViewInit() {
    let dragCounter = 0;
    const docElem = document.documentElement;
    const element = this.ref.nativeElement;

    const properties = {
      items: this.items.map((el: ItemMuuriComponent) => el.element),
      dragContainer: element,
    };
    this.options = window['options'] = Object.assign( properties, defaultOptions, this.options);
    this.grid = window['grid'] = new Muuri(element, this.options);
    this.grid.on('dragStart', () => {
      ++dragCounter;
      docElem.classList.add('dragging');
    })
    .on('dragEnd', () => {
      if (--dragCounter < 1) {
        docElem.classList.remove('dragging');
      }
    });

    combineLatest(this.items.map( i => i.changeSize))
    .subscribe ( () => {
      this.grid.refreshItems();
      this.grid.layout();
    });
  }
  removeItem(item) {
    const i = this.items.find( (value) => {
      return item.id === value.id;
    });
    if (i) {
      this.grid.remove(i.element);
    }
  }
  resizeItem(e, item) {
    item.width = e.width;
    item.height = e.height;
    this.grid.layout();
    this.grid.refreshItems();
  }
}
