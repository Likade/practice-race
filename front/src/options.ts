import { MyElement } from './element';
import { Button } from './button';
import { InputBlock } from './input-block';
import { ICar, ICreate, IChange } from './inefaces';

import './styles/options.css';

class OperationBtn extends MyElement {
  startAll: () => void = () => {};
  resetAll: () => void = () => {};
  generateHundred: () => void = () => {};
  race: Button;
  reset: Button;
  generate: Button;

  constructor(parent: HTMLElement) {
    super(parent, 'div', ['options__buttons']);
    this.race = new Button(this.element, ['options__buttons_race'], 'race');
    this.race.onClickButton = () => this.startAll();
    this.reset = new Button(this.element, ['options__buttons_reset'], 'reset', true);
    this.reset.onClickButton = () => this.resetAll();
    this.generate = new Button(this.element, ['options__buttons_generate'], 'generate cars');
    this.generate.onClickButton = () => this.generateHundred();
  }
}

class OperationInput extends MyElement {
  create: (state: ICreate) => void = () => {};
  private input: InputBlock;
  private color: InputBlock;
  private button: Button;
  status = {name: '', color: '#000000'};

  constructor(parent: HTMLElement, value: string, styles: string[] = []) {
    super(parent, 'div', ['options__wrapper']);
    const inputWrapper = new MyElement(this.element, 'div', ['options__wrapper_text']);
    this.input = new InputBlock(inputWrapper.element, 'text', []);
    this.input.getValue = (event) => this.changeStatus('name', event);
    this.color = new InputBlock(this.element, 'color', ['options__wrapper_color'], '#000000');
    this.color.getValue = (event) => this.changeStatus('color', event);
    this.button = new Button(this.element, ['options__wrapper_button'], value);
    this.button.element.setAttribute('disabled', '');
    this.button.onClickButton = () => {
      this.create(this.status);
      this.resetStatus();
    };
    this.element.classList.add(...styles);
  }

  changeStatus(key: keyof ICreate, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.status[key] = input.value;
    this.button.element.toggleAttribute('disabled', this.status.name === '');
  }

  resetStatus(): void {
    this.status = {name: '', color: '#000000'};
    this.changeInput();
  }

  changeInput(): void {
    (this.input.element as HTMLInputElement).value = this.status.name;
    (this.color.element as HTMLInputElement).value = this.status.color;
    this.button.element.setAttribute('disabled', '');
  }
}

export class Options extends MyElement {
  startAll: () => void = () => {};
  resetAll: () => void = () => {};
  generateHundred: () => void = () => {};
  create: (state: ICreate) => void = () => {};
  change: (car: IChange) => void = () => {};
  changeInput: OperationInput;
  operationBtns: OperationBtn;

  constructor(parent: HTMLElement) {
    super(parent, 'div', ['options']);
    const createInput = new OperationInput(this.element, 'create', []);
    createInput.create = (state) => this.create(state);
    this.changeInput = new OperationInput(this.element, 'update', []);
    this.changeInput.create = () => {
      this.change(this.changeInput.status);
    };
    this.operationBtns = new OperationBtn(this.element);
    this.operationBtns.startAll = () => this.startAll();
    this.operationBtns.resetAll = () => this.resetAll();
    this.operationBtns.generateHundred = () => this.generateHundred();
  }

  updateState(car: ICar): void {
    this.changeInput.status = car;
    this.changeInput.changeInput();
  }
}
