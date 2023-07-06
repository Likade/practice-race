import { MyElement } from './element';
import './styles/button.css';

export class Button extends MyElement {
  onClickButton: () => void = () => {};
  constructor(parent: HTMLElement, styles: string[] = [], content: string, disabled = false) {
    super(parent, 'button', ['button'], content);
    this.element.classList.add(...styles);
    this.element.addEventListener('click', () => this.onClickButton());
    if (disabled) {
      this.Disable(true);
    }
  }

  Disable(type = false): void {
    this.element.toggleAttribute('disabled', type);
  }

  deleteDisable(): void {
    this.element.removeAttribute('disabled');
  }
}
