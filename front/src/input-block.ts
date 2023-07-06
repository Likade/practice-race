import { MyElement } from './element';

export class InputBlock extends MyElement {
  getValue: (event: Event) => void = () => {};
  constructor(parent: HTMLElement, type: string, styles: string[] = [], value?: string) {
    super(parent, 'input', []);
    this.element.setAttribute('type', type);
    this.element.classList.add(...styles);
    if (value) {
      this.element.setAttribute('value', value);
    }
    this.element.addEventListener('input', (event) =>
      this.getValue(event),
    );
  }
}
