import { KeyNotFoundException } from '@app/core/exceptions/key-not-found.exception';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key: string, data: any) {
      localStorage.setItem(key, JSON.stringify(data));
  }

  get<T>(key: string): T {
    try {
      const result = JSON.parse(localStorage.getItem(key));
<<<<<<< HEAD

      // if (result === null) {
      //   throw new KeyNotFoundException(`${key} does not exist in the local storage or access is denied`);
      // }
=======
>>>>>>> 7eda0c040e106fafe9c5e6312e68cc0b312dd5d3
      return result;
    }
    catch (err) {
      throw err;
    }
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
