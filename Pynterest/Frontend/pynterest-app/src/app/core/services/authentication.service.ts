import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { User } from '@app/core/models/user';
import { InvalidUserFormatException } from '../exceptions/invalid-user-format.exception';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  login(emailAddress: string, password:string): Observable<User> {
    const params = new HttpParams()
      .set('username', emailAddress)
      .set('password', password);
    const authenticateEnpoint = `${environment.baseAPI}/pynterest/authentication/login`;
    return this.http
      .post<User>(authenticateEnpoint, { params })
      .pipe(
        tap(user => {
          this.localStorageService.set('user', user)
          return user;
        })
      );
  }

  public isLoggedIn(): boolean {
    let user: User = null;
    try {
      user = this.getUserFromLocalStorage();
    }
    catch (err) {

    }
    return user !== null;
  }

  getUserFromLocalStorage(): User {
    try {
      return this.localStorageService.get<User>('user');
    }
    catch (err) {
      if (err instanceof SyntaxError) {
        throw new InvalidUserFormatException('Cannnot parse user from localStorage');
      }
      throw err;
    }
  }

  removeUserFromLocalStorage() {
    this.localStorageService.remove('user');
  }
}
