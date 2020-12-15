import { KeyNotFoundException } from '@app/core/exceptions/key-not-found.exception';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  set(key: string, data: any) {
      sessionStorage.setItem(key, JSON.stringify(data));
  }

  get<T>(key: string): T {
    try {
      const result = JSON.parse(sessionStorage.getItem(key));
      return result;
    }
    catch (err) {
      throw err;
    }
  }

  remove(key: string) {
    sessionStorage.removeItem(key);
  }
}
