import { IRoot } from './inefaces';
import { MyElement } from './element';
import { Garage } from './garage';
import { Winners } from './winners';

export class Rooter {
  private readonly roots: Array<IRoot>;
  private default: IRoot;
  garage: MyElement;
  winners: MyElement | undefined;
  constructor(private rootElem: HTMLElement) {
    this.garage = new Garage(this.rootElem);
    this.roots = [
      {
        name: '/',
        component: () => {
          this.rootElem.append(this.garage.element);
        },
      },
      {
        name: '/winners',
        component: () => {
          this.winners = new Winners(this.rootElem);
          this.rootElem.append(this.winners.element);
        },
      },
    ];
    this.default = {
      name: 'Default router',
      component: () => {
        this.rootElem.innerHTML = 'Default Page';
      },
    };
  }

  changeRooter(): void {
    this.rootElem.innerHTML = '';
    const name = window.location.hash.slice(1);
    const root = this.roots.find((page) => page.name === name);
    (root || this.default).component();
  }

  initRooter(): void {
    if (window.location.hash === '') {
      window.location.hash = '#/';
    }
    window.onpopstate = () => this.changeRooter();
    this.changeRooter();
  }
}
