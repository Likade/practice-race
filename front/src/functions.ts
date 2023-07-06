import {ICar, IEngine, ICreate, IChange, IWin} from './inefaces';

export const startEngine = async (carId: number): Promise<{ status: number; result: IEngine }> => {
    try {
      const data = await fetch(`http://localhost:3000/engine?id=${carId}&status=started`);
      const res: IEngine = await data.json();
      return {status: data.status, result: res};
    } 
    catch (err) {
      //@ts-ignore
      throw new Error(err);
    }
  };

  export const stopEngine = async (carId: number): Promise<{ status: number; result: IEngine }> => {
    try {
      const data = await fetch(`http://localhost:3000/engine?id=${carId}&status=stopped`);
      const res: IEngine = await data.json();
      return {status: data.status, result: res};
    } catch (err) {
      //@ts-ignore
      throw new Error(err);
    }
  };
  
  export const DriveMode = async (carId: number): Promise<number> => {
    try {
      const data = await fetch(`http://localhost:3000/engine?id=${carId}&status=drive`);
      return data.status;
    } catch (err) {
      //@ts-ignore
      throw new Error(err);
    }
  };

  export const createCar = async (car: ICreate): Promise<void> => {
    try {
      await fetch(`http://localhost:3000/garage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car)
      });
    } 
    catch (err) {
      //@ts-ignore
      throw new Error(err);
    }
  };

  export const createWinner = async (carData: IWin): Promise<number> => {
    try {
      const data = await fetch(`http://localhost:3000/winners`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });
      return data.status;
    } 
    catch (err) {
      //@ts-ignore
      throw new Error(err);
    }
  };

  export const deleteCar = async (carId: number): Promise<void> => {
    try {
      await fetch(`http://localhost:3000/garage/${carId}`, {
        method: 'DELETE',
      });
    } 
    catch (err) {
      //@ts-ignore
      throw new Error(err);
    }
  };

  export const deleteWinner = async (carId: number): Promise<void> => {
    try {
      await fetch(`http://localhost:3000/winners/${carId}`, {
        method: 'DELETE',
      });
    } 
    catch (err) {
      //@ts-ignore
      throw new Error(err);
    }
  };

  export const getCar = async (carId: number): Promise<ICar | null> => {
    try {
      const data = await fetch(`http://localhost:3000/garage/${carId}`);
      const result: ICar = await data.json();
      if (data.status === 200) {
        return result;
      }
      return null;
    } 
    catch (err) {
      //@ts-ignore
      throw new Error(err);
    }
  };

  export const getAllCars = async (page = 1, limit = 7): Promise<{ cars: Array<ICar>; count: string } | null> => {
    try {
      const data = await fetch(`http://localhost:3000/garage?_limit=${limit}&_page=${page}`);
      const res: ICar[] = await data.json();
      if (data.status === 200) {
        return {
          cars: res,
          count: data.headers.get('X-Total-Count') || '0',
        };
      }
      return null;
    } 
    catch (err) {
      //@ts-ignore
      throw new Error(err);
    }
  };

  export const getWinner = async (winnerId: number): Promise<{ status: number; result: IWin }> => {
    try {
      const data = await fetch(`http://localhost:3000/winners/${winnerId}`);
      const res: IWin = await data.json();
      return {status: data.status, result: res};
    } 
    catch (err) {
      //@ts-ignore
      throw new Error(err);
    }
  };

  export const updateCar = async (car: IChange): Promise<void> => {
    try {
      await fetch(`http://localhost:3000/garage/${car.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
      });
    } 
    catch (err) {
      //@ts-ignore
      throw new Error(err);
    }
  };

  export const updateWin = async (carData: IWin): Promise<void> => {
    try {
      await fetch(`http://localhost:3000/winners/${carData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });
    } 
    catch (err) {
      //@ts-ignore
      throw new Error(err);
    }
  };

  export const getAllWinners = async (
    page: number,
    sort = 'time',
    order = 'ASC',
    limit = 10,
  ): Promise<{ result: Array<IWin>; totalCount: string }> => {
    try {
      const data = await fetch(
        `http://localhost:3000/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
      );
      const res: Array<IWin> = await data.json();
  
      return {
        result: res,
        totalCount: data.headers.get('X-Total-Count') || '0',
      };
    } catch (err) {
      //@ts-ignore
      throw new Error(err);
    }
  };
  