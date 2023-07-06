import { MyElement } from './element';
import { WinnersWrapper } from './winnersWrapper';
import { getAllWinners } from './functions';

export class Winners extends MyElement {
  winnersWrapper = new WinnersWrapper(this.element);
  page = 1;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['winners']);
    this.getAllWinners();

    this.winnersWrapper.turnPage = (pageNumber) => {
      this.page = pageNumber;
      this.getAllWinners(this.page);
    };
    this.winnersWrapper.sortWins = (type, order) => {
      this.getAllWinners(this.page, type, order);
    };
  }

  async getAllWinners(page = 0, sort = 'id', order = 'ASC'): Promise<void> {
    const winners = await getAllWinners(page, sort, order);
    const totalCount = +winners.totalCount;

    this.winnersWrapper.pangination.changeNext(
      this.page,
      totalCount,
      10,
    );
    this.winnersWrapper.addWinners(winners);
  }
}
