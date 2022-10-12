import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {LayoutQuery} from "../store/layout.query";
import {Layout} from "../store/layout.model";

@Directive({
  selector: '[ngScribeLayout]'
})
export class LayoutDirective implements OnInit {

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              private layoutQuery: LayoutQuery) {
  }

  ngOnInit() {
    this.layoutQuery.select().subscribe((layout: Layout) => {
      const element = this.el.nativeElement;
      if (layout.contentBottom) {
        this.renderer.setStyle(element, 'grid-template-rows', '1.5rem 1fr 10rem 1.5rem')
      } else {
        this.renderer.setStyle(element, 'grid-template-rows', '1.5rem 1fr 0 1.5rem')
      }

      if (layout.contentLeft) {
        this.renderer.setStyle(element, 'grid-template-columns', ' 1.5rem 10rem 1fr 0 1.5rem')
      } else {
        this.renderer.setStyle(element, 'grid-template-columns', ' 1.5rem 0 1fr 0 1.5rem')
      }

      if (layout.contentRight) {
        this.renderer.setStyle(element, 'grid-template-columns', ' 1.5rem 0 1fr 10rem 1.5rem')
      } else {
        this.renderer.setStyle(element, 'grid-template-columns', ' 1.5rem 0 1fr 0 1.5rem')
      }
    })
  }

}
