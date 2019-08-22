import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import {fromEvent} from 'rxjs';
import interact from 'interactjs';

@Component({
  selector: '[muuri-item]',
  styles: [`
    :host {
      display: block;
      position: absolute;
      margin: 5px;
      z-index: 1;
      border-radius:4px;
      border-width: 2px !important;
      padding: 2px;
      background: white;
    }
    :host.muuri-item-dragging {
      z-index: 3;
      border-style: dashed !important;
    }
    :host.muuri-item-releasing {
      z-index: 2;
    }
    :host.muuri-item-hidden {
      z-index: 0;
    }
    :host.muuri-item-dragging .card-remove,
    :host.muuri-item-positioning .card-remove,
    :host.muuri-item-releasing .card-remove,
    :host.muuri-item-placeholder .card-remove {
      display: none;
    }
    :host.muuri-item-placeholder .card {
      border-style: dashed;
    }
    :host.muuri-item-placeholder {
      z-index: 2;
      margin: 0;
      opacity: 0.5;
    }
    .item-content {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .item-muuri-header{
      display:flex;
      width:100%;
      z-index:100;
      height:20px;
      cursor:move;
      transition: all .2s;
    }
    .item-muuri-header:hover{
      background-color: rgba(161,161,161,.05);
    }
    .item-muuri-header > div{
      flex: 1;
    }
    .item-muuri-header > .actions{
      display: flex;
      flex-basis: 100px;
      justify-content: flex-end;
      align-content: flex-end;
      max-width: 100px;
    }
    .item-muuri-header .btn{
      background: transparent;
      border: none;
      font-weight:bold;
      color: black;
      outline: none;
      cursor: pointer;
      z-index:1000;
    }
    .item-inner-content{
      /* flex: 1 1; */
      display: block;
      width:100%;
      height: calc(100% - 20px);
    }

  `],
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
  id: string;
  @Input()
  width: number;
  @Input()
  height: number;
  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onClick: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onResize: EventEmitter<any> = new EventEmitter();

  element: any;

  constructor(private ref: ElementRef) {}

  ngOnInit() {

    this.element = this.ref.nativeElement;
    this.element.classList.add('item');

    if (this.id) {
      this.element.setAttribute('item-muuri-id', this.id);
    }
    this.element.classList.add('item');
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

      source.subscribe( (evt) => {
        this.eventClick(evt);
      });
    }
    this.addResizeEvent();
  }

  eventClick($event) {
    this.onClick.emit($event);
  }

  addResizeEvent() {
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
      .on('resizemove', (event) => {
        event.stopPropagation();
        const target = event.target;
        let x = (parseFloat(target.getAttribute('data-x')) || 0);
        let y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        self.onResize.emit(target);
      });
  }
}
