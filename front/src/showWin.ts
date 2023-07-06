import { IData } from './inefaces';
import { MyElement } from './element';
import './styles/winner.css';

export class ShowWin extends MyElement {
  constructor(parent: HTMLElement, data: IData) {
    super(parent, 'div', ['winner']);
    const title = new MyElement(this.element, 'h2', ['winner__show']);
    title.element.style.color = `${data.color}`;
    title.element.innerHTML = `Winner <span>${data.name}</span> in <span>${data.speed}</span> sec`;
  }
}
