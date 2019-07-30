import { Component, Directive, OnInit, ElementRef, AfterViewInit, QueryList, ContentChildren, Input, Optional } from '@angular/core';
import {ItemMuuriComponent} from './item-muuri.component';
import Muuri from 'muuri';

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
  itemHiddenClass: 'muuri-item-hidden'
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
    const element = this.ref.nativeElement;

    const properties = {
      items: this.items.map((el: ItemMuuriComponent) => el.element),
      dragContainer: element,
    };
    this.options = Object.assign( properties, this.options, defaultOptions);
    this.grid = new Muuri(element, this.options);

  }
  removeItem(item) {
    const i = this.items.find( (value) => {
      return item.id === value.id;
    });
    if (i) {
      this.grid.remove(i.element);
    }
  }
  resizeItem(item) {
    this.grid.layout();
    this.grid.refreshItems();
  }
}