import { ICar } from './inefaces';
import { MyElement } from './element';
import { GarageElem } from './garageElem';
import { Pangination } from './pangination';

import './styles/garage.css';

export class GarageWrapper extends MyElement {
  removeCar: (carId: number) => void = () => {};
  changeCar: (carId: number) => void = () => {};
  turnPage: (page: number) => void = () => {};
  private wrapper: MyElement;
  private title: MyElement;
  pangination: Pangination;
  cars: Array<GarageElem>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['race']);
    this.cars = [];
    this.title = new MyElement(this.element, 'h2');
    this.wrapper = new MyElement(this.element, 'div', ['race']);
    this.pangination = new Pangination(this.element);
    this.pangination.changePage = (page) => this.turnPage(page);
  }

  private changeTitle(count: string) {
    this.title.element.innerHTML = `Garage - ${count} cars`;
  }

  private clear() {
    this.wrapper.element.innerHTML = '';
    this.cars = [];
  }

  addElems(cars: Array<ICar>, count: string): void {
    this.clear();
    this.changeTitle(count);
    this.cars = cars.map((car) => {
      const item = new GarageElem(this.wrapper.element, car);
      item.remove = (carId) => this.removeCar(carId);
      item.change = (carId) => this.changeCar(carId);
      return item;
    });
  }
}
