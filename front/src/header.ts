import { MyElement } from './element';
import './styles/header.css';

export class Header extends MyElement {
  private nav: MyElement[] = [];
  private garage: MyElement;
  private winners: MyElement;

  constructor(parent: HTMLElement) {
    super(parent, 'div', ['header']);
    this.garage = new MyElement(this.element, 'a', ['header__button'], 'Garage');
    this.winners = new MyElement(this.element, 'a', ['header__button'], 'Winners');
    this.garage.element.setAttribute('href', '#/');
    this.winners.element.setAttribute('href', '#/winners');
    this.nav = [this.garage, this.winners];
    window.addEventListener('hashchange', () =>
      this.changeCurrent(this.nav),
    );
    window.addEventListener('load', () => this.changeCurrent(this.nav));
  }

  private changeCurrent(navItems: MyElement[]): void {
    this.nav = navItems.map((elem) => {
      elem.element.classList.remove('header__button_active');
      if (elem.element.getAttribute('href') === window.location.hash) {
        elem.element.classList.add('header__button_active');
      }
      return elem;
    });
  }
}
