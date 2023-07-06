export class MyElement {
    element: HTMLElement;
  
    constructor( parent: HTMLElement, tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = [], content = '') {
      this.element = document.createElement(tag);
      this.element.classList.add(...styles);
      this.element.textContent = content;
      if (parent) {
        parent.append(this.element);
      }
    }
  
    destruct(): void {
      this.element.remove();
    }
  }
  