import { Component, OnInit, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import {fromEvent} from 'rxjs';
import interact from 'interactjs';

@Component({
  selector: '[item-muuri]',
  template: `<div id="item-muuri-id-{{id}}" class="item-content">
              <div class="item-muuri-header" >
                <div></div>
                <div class="actions">
                  <button type="button" class="btn btn-item-muuri" >X</button>
                </div>
              </div>
              <div class="item-inner-content">
                <ng-content></ng-content>
              </div>
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
  @Output()
  onResize: EventEmitter<any> = new EventEmitter();

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
      const source = fromEvent(button, 'click');

      source.subscribe( (evt)=>{
        this.eventClick(evt);
      });
    }
    this.addResizeEvent();
  }

  eventClick($event) {
    this.onClick.emit($event);
  }

  addResizeEvent(){
    const self = this;
    interact(this.element)
    .resizable({
        // resize from all edges and corners
        edges: { left: false, right: true, bottom: true, top: false },

        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent',
            endOnly: true
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 100, height: 50 }
          })
        ],

        inertia: true
      })
      .on('resizemove', function (event) {
        event.stopPropagation();
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        /*target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)*/
        self.onResize.emit(target);
      })
  }
}