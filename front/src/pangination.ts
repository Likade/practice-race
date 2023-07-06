import { MyElement } from './element';
import { Button } from './button';

import './styles/pangination.css';

export class Pangination extends MyElement {
  changePage: (page: number) => void = () => {};
  private page = 1;
  private title: MyElement;
  next: Button;
  prev: Button;

  constructor(parent: HTMLElement) {
    super(parent, 'div', ['pangination']);
    this.prev = new Button(this.element, ['pangination__prev'], 'Prev', true);
    this.prev.onClickButton = () => this.switchPage('prev');
    this.next = new Button(this.element, ['pangination__next'], 'Next');
    this.next.onClickButton = () => this.switchPage('next');
    this.title = new MyElement(this.element, 'h3', ['pangination__page'], `Page #${this.page}`);
  }

  changeNext(page: number, total: number, max: number): void {
    if (page >= total / max) {
      this.next.Disable(true);
    } else {
      this.next.Disable(false);
    }
  }

  private changePrev(): void {
    if (this.page === 1) {
      this.prev.Disable(true);
    } else {
      this.prev.Disable(false);
    }
  }

  private switchPage(type: string) {
    if (type === 'prev') {
      if (this.page > 1) this.page--;
    }
    if (type === 'next') this.page++;
    this.title.element.innerHTML = `Page #${this.page}`;
    this.changePage(this.page);
    this.changePrev();
  }
}
