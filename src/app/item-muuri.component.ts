import { Component, OnInit, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import {fromEvent} from 'rxjs';

@Component({
  selector: '[item-muuri]',
  template: `<div id="item-muuri-id-{{id}}" class="item-content">
              <div class="item-muuri-header" >
                <button type="button" class="btn btn-item-muuri" >X</button>
              </div>
              <ng-content></ng-content>
            </div>`
})
export class ItemMuuriComponent implements OnInit {
  @Input()
  id: string = '';
  @Input()
  width: number;
  @Input()
  height: number;
  @Output()
  onClick: EventEmitter<any> = new EventEmitter();

  element: any;

  constructor(private ref: ElementRef) { 
    
  }

  ngOnInit() {
    this.element = this.ref.nativeElement;
    if (this.id) {
      this.element.setAttribute('item-muuri-id', this.id);
    }
    this.element.classList.add("item");
    if (this.width) {
      this.element.style.width = Math.ceil(this.width) + 'px';
    }
    if (this.height) {
      this.element.style.height = Math.ceil(this.height) + 'px';
    }
    this.element.style.border = 'solid 1px black';
    const button = this.element.querySelector('button');
    
    if (button) {
      console.log(button);
      const source = fromEvent(button, 'click');

      source.subscribe( (evt)=>{
        this.eventClick(evt);
      });
    }
  }

  eventClick($event) {
    this.onClick.emit($event);
  }
}