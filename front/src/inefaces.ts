export interface IRoot {
  name: string;
  component: () => void;
}

export interface ICar {
  id: number;
  name: string;
  color: string;
}

export interface ICreate {
  name: string;
  color: string;
}

export interface IEngine {
  velocity: number;
  distance: number;
}

export interface IDrive {
  success: boolean;
}

export interface IChange {
  id?: number;
  name: string;
  color: string;
}

export interface IWin {
  id: number;
  time: number;
  wins: number;
}

export interface IData {
  id: number;
  name: string;
  color: string;
  speed: number;
  wins: number;
  time?: number;
}

export interface IWinCar extends ICar, IWin {}