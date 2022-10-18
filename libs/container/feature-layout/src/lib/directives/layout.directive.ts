import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {LayoutQuery} from "../../../../../shared/data-access/src/lib/store/layout/layout.query";
import {Layout} from "../../../../../shared/data-access/src/lib/store/layout/layout.model";

@Directive({
  selector: '[ngScribeLayout]'
})
export class LayoutDirective implements OnInit {

  private _layout: Layout | undefined;

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              private layoutQuery: LayoutQuery) {
  }

  ngOnInit() {
    this.layoutQuery.select().subscribe((layout: Layout) => {
      const element = this.el.nativeElement;
      const selectedPanel = this.getPanel(layout, this._layout);
      if (selectedPanel === 'contentBottom' && layout[selectedPanel] === 'open') {
        this.renderer.setStyle(element, 'grid-template-rows', '1.5rem 1fr 20% 1.5rem');
        // TODO: Find a better way to do this so that it doesn't affect all side buttons
        const button = element.querySelector('#bottomButton');
        this.renderer.addClass(button, 'selected')
      } else if (selectedPanel === 'contentBottom' && layout[selectedPanel] === 'closed') {
        this.renderer.setStyle(element, 'grid-template-rows', '1.5rem 1fr 0 1.5rem')
        // TODO: Find a better way to do this so that it doesn't affect all side buttons
        const button = element.querySelector('#bottomButton');
        this.renderer.removeClass(button, 'selected')
      }

      if (selectedPanel === 'contentLeft' && layout[selectedPanel] === 'open') {
        this.renderer.setStyle(element, 'grid-template-columns', ' 1.5rem 20% 1fr 0 1.5rem')
        // TODO: Find a better way to do this so that it doesn't affect all side buttons
        const button = element.querySelector('#leftButton');
        this.renderer.addClass(button, 'selected')
      } else if (selectedPanel === 'contentLeft' && layout[selectedPanel] === 'closed') {
        this.renderer.setStyle(element, 'grid-template-columns', ' 1.5rem 0 1fr 0 1.5rem')
        // TODO: Find a better way to do this so that it doesn't affect all side buttons
        const button = element.querySelector('#leftButton');
        this.renderer.removeClass(button, 'selected')
      }

      if (selectedPanel === 'contentRight' && layout[selectedPanel] === 'open') {
        this.renderer.setStyle(element, 'grid-template-columns', ' 1.5rem 0 1fr 20% 1.5rem')
        // TODO: Find a better way to do this so that it doesn't affect all side buttons
        const button = element.querySelector('#rightButton');
        this.renderer.addClass(button, 'selected')
      } else if (selectedPanel === 'contentRight' && layout[selectedPanel] === 'closed') {
        this.renderer.setStyle(element, 'grid-template-columns', ' 1.5rem 0 1fr 0 1.5rem')
        // TODO: Find a better way to do this so that it doesn't affect all side buttons
        const button = element.querySelector('#rightButton');
        this.renderer.removeClass(button, 'selected')
      }

      this._layout = layout;
    })
  }

  getPanel(newLayout: Layout, oldLayout: Layout | undefined): string {
    let match: any;
    if (oldLayout) {
      Object.keys(oldLayout).forEach(key => {
        if (oldLayout[key as keyof Layout] !== newLayout[key as keyof Layout]) {
          match = key;
        }
      });
    } else {
      Object.keys(newLayout).forEach(key => {
        if (newLayout[key as keyof Layout] === 'open') {
          match = key
        }
      })
    }
    return match;
  }


}
