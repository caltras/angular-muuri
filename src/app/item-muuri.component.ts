import { Component, OnInit, ElementRef, Input, Directive } from '@angular/core';

@Component({
  selector: '[item-muuri]',
  template: `<div id="item-muuri-id-{{id}}" class="item-content">
                  <ng-content></ng-content>
                </div>`
})
export class ItemMuuriComponent implements OnInit  {
  @Input()
  id: string = '';
  @Input()
  width: number;
  @Input()
  height: number;

  element: any;

  constructor(private ref: ElementRef){}
  ngOnInit(){
    this.element = this.ref.nativeElement;
    if (this.id){ 
      this.element.setAttribute('item-muuri-id', this.id);
    }
    this.element.classList.add("item");
    if (this.width){
      this.element.style.width = Math.ceil(this.width) + 'px';
    }
    if (this.height){
      this.element.style.height = Math.ceil(this.height) + 'px';
    }
    this.element.style.border = 'solid 1px black';
  }
}