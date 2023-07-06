import { GarageWrapper } from './garageWrapper';
import { MyElement } from './element';
import { Options } from './options';
import {createCar, createWinner, deleteCar, deleteWinner, getAllCars, getCar, getWinner, updateCar, updateWin} from './functions';
import { ICar, IData, ICreate, IChange, IWin} from './inefaces';
import { cars } from './cars';
import { GarageElem } from './garageElem';
import { ShowWin } from './showWin';

const randomColor = (min = 0, max = 255) => {
  const random = () => min + Math.floor(Math.random() * (max - min + 1));
  const r = random();
  const g = random();
  const b = random();
  return `rgb(${r},${g},${b})`;
};


export class Garage extends MyElement {
  private winnerShadow: ShowWin | undefined;
  private options: Options;
  private wrapper: GarageWrapper;
  page = 1;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['garage']);
    this.getAllCars(this.page);
    this.options = new Options(this.element);
    this.options.create = async (state) => {
      await this.createCar(state);
      await this.getAllCars(this.page);
    };
    this.options.change = (state) => this.changeCar(state);
    this.options.startAll = () => this.startAll();
    this.options.resetAll = () => this.resetAll();
    this.options.generateHundred = () => this.generateHundred();
    this.wrapper = new GarageWrapper(this.element);
    this.wrapper.removeCar = (carId) => this.removeCar(carId);
    this.wrapper.changeCar = (carId) => this.getCar(carId);
    this.wrapper.turnPage = (page) => {
      this.page = page;
      this.getAllCars(page);
    };
  }

  private async getAllCars(page: number): Promise<void> {
    const data = await getAllCars(page);
    if (data) {
      const carsArr: Array<ICar> = data.cars;
      const count: string = data.count;
      this.wrapper.addElems(carsArr, count);
      this.wrapper.pangination.changeNext(this.page, +count, 7);
    }
  }

  private async getCar(carId: number): Promise<void> {
    const car = await getCar(carId);
    if (car) this.options.updateState(car);
  }

  private async changeCar(car: IChange): Promise<void> {
    await updateCar(car);
    await this.getAllCars(this.page);
  }

  private async createCar(car: ICreate): Promise<void> {
    await createCar(car);
  }

  private async removeCar(carId: number): Promise<void> {
    await deleteCar(carId);
    await deleteWinner(carId);
    await this.getAllCars(this.page);
  }

  private async generateHundred(): Promise<void> {
    this.options.operationBtns.race.Disable(true);
    this.options.operationBtns.generate.Disable(true);
    const { mark, model } = cars;
    for (let i = 0; i < 100; i += 1) {
      const name = `${mark[Math.floor(Math.random() * mark.length)]} ${model[Math.floor(Math.random() * model.length)]}`;
      await this.createCar({
        name: name,
        color: randomColor(),
      });
    }
    await this.getAllCars(this.page);
    this.options.operationBtns.race.Disable(false);
    this.options.operationBtns.generate.Disable(false);
  }

  private async startAll(): Promise<void> {
    this.options.operationBtns.race.Disable(true);
    this.options.operationBtns.generate.Disable(true);
    const res: Promise<GarageElem>[] = this.wrapper.cars.map(async (car) => {
        await car.startEngine(car.car.id);
        car.fullDisable();
        return car;
      },
    );
    const winner = await Promise.race(res);
    const winData: IData = {
      id: winner.car.id,
      name: winner.car.name,
      color: winner.car.color,
      speed: +(winner.speed / 1000).toFixed(3),
      wins: 1,
    };
    this.winnerShadow = new ShowWin(this.element, winData);
    this.options.operationBtns.reset.deleteDisable();
    setTimeout(() => this.winnerShadow?.destruct(), 3000);
    await this.addWin(winData);
  }

  private async addWin(winnerCar: IData): Promise<void> {
    const winData = await getWinner(winnerCar.id);
    if (winData.status === 200) {
      winData.result.wins++;
      winnerCar.wins = winData.result.wins;
      await this.updateWinner(winnerCar);
    } 
    else {
      await this.createWinner(winnerCar);
    }
  }

  private async createWinner(winnerData: IData): Promise<void> {
    const carObj = {
      id: winnerData.id,
      wins: 1,
      time: winnerData.speed,
    };
    await createWinner(carObj);
  }

  private async updateWinner(winnerData: IData): Promise<void> {
    const carObj: IWin = {
      id: winnerData.id,
      wins: winnerData.wins,
      time: winnerData.speed,
    };

    await updateWin(carObj);
  }

  private resetAll(): void {
    this.options.operationBtns.reset.Disable(true);
    const allCars = this.wrapper.cars?.map(async (car) => {
      await car.stopEngine(car.car.id);
    });
    Promise.all(allCars).then(() => {
      this.options.operationBtns.race.deleteDisable();
      this.options.operationBtns.generate.deleteDisable();
    });
  }
}
