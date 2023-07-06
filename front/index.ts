import { MyElement } from './src/element';
import { Rooter } from './src/roots';
import { Header } from './src/header';
import './index.css';

class Base {
  private main;
  private rooter;

  constructor(private element: HTMLElement) {
    const header = new Header(this.element);
    this.main = new MyElement(this.element, 'main', ['main']);
    this.rooter = new Rooter(this.main.element);
  }
  
  init(): void {
    this.rooter.initRooter();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const element = document.body;
  const base = new Base(element);
  base.init();
});
