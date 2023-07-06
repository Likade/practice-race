import {  MyElement } from './element';
import { ICar, IWin, IWinCar } from './inefaces';
import { WinnersElem } from './winnersElem';
import { getCar } from './functions';
import { Pangination } from './pangination';

import './styles/winnersPage.css';

export class WinnersWrapper extends MyElement {
  turnPage: (page: number) => void = () => {};
  sortWins: (type: string, order: string) => void = () => {};
  private title: MyElement;
  private wrapper: MyElement;
  pangination: Pangination;
  winners: Array<IWin> = [];

  constructor(parent: HTMLElement) {
    super(parent, 'div', ['winners']);
    this.title = new MyElement(this.element, 'h2', ['winners__count']);
    const Top = new MyElement(this.element, 'div', ['winners__elem', 'winners__elem_top']);
    Top.element.innerHTML = `
    <div class="winners__elem_id">№</div>
    <div class="winners__elem_image">Car Image</div>
    <div class="winners__elem_name">Name</div>
    <div class="winners__elem_wins">
      <span>Total Wins</span>
       <img class="winners__elem_arrow" src="./assets/icons8-вниз-50.png" />
    </div>
    <div class="winners__elem_time">
      <span>Time (sec)</span>
      <img class="winners__elem_arrow" src="./assets/icons8-вниз-50.png" />
    </div>
  `;
    const wins = Top.element.querySelector('.winners__elem_wins');
    wins?.addEventListener('click', () =>
      this.SortWins(wins, 'wins'),
    );
    const time = Top.element.querySelector('.winners__elem_time');
    time?.addEventListener('click', () =>
      this.SortWins(time, 'time'),
    );
    this.wrapper = new MyElement(this.element, 'div');
    this.pangination = new Pangination(this.element);
    this.pangination.changePage = (page) => this.turnPage(page);
  }

  private SortWins(element: Element, type: string) {
    element.classList.toggle('winners__elem_active');
    if (element.classList.contains('winners__elem_active')) {
      this.sortWins(type, 'ASC');
    } 
    else {
      this.sortWins(type, 'DESC');
    }
  }

  private changeTitle(count: string) {
    this.title.element.innerHTML = `Winners - ${count} cars`;
  }

  private async getCar(carId: number) {
    const data = await getCar(carId);
    return data;
  }

  addWinners(winners: {
    result: Array<IWin>;
    totalCount: string | null;
  }): void {
    this.wrapper.element.innerHTML = '';
    this.winners = winners.result;
    let id = 1;

    if (winners.totalCount) this.changeTitle(winners.totalCount);

    this.winners.forEach(async (winner) => {
      const winnerCar: ICar | null = await this.getCar(winner.id);

      if (winnerCar) {
        const carData: IWinCar = {
          id: id++,
          name: winnerCar.name,
          color: winnerCar.color,
          wins: winner.wins,
          time: winner.time,
        };

        const winnersElem = new WinnersElem(this.wrapper.element, carData);
      }
    });
  }
}
