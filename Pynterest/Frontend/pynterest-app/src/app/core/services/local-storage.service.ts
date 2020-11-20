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
