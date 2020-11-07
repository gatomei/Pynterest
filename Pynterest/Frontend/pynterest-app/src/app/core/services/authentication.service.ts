import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { User } from '@app/core/models/user';
import { InvalidUserFormatException } from '../exceptions/invalid-user-format.exception';
import { UserForRegister } from '../models/userForRegister';
import { ForgotPasswordModel } from '../models/forgotPasswordModel';
import { NewPasswordModel } from '../models/newPasswordModel';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  login(email: string, password:string): Observable<string> {
    const authenticateEnpoint = `${environment.baseAPI}/pynterest/authentication/login`;
    return this.http
      .post<string>(authenticateEnpoint, { email, password})
      .pipe(
        tap(userToken => {
          debugger;
          this.localStorageService.set('userToken', userToken)
          return userToken;
        })
      );
  }

  registerUser(user: UserForRegister){
    const registerEndpoint = `${environment.baseAPI}/pynterest/authentication/register`;
    return this.http.post(registerEndpoint, user);
  }

  sendEmailToRecoverPassword(forgotPasswordModel: ForgotPasswordModel){
    const forgotPasswordEndpoint = `${environment.baseAPI}/pynterest/authentication/forgot-password`;
    return this.http.post(forgotPasswordEndpoint, forgotPasswordModel);
  }

  sendNewPassword(newPasswordModel: NewPasswordModel){
    const resetPassEndpoint = `${environment.baseAPI}/pynterest/authentication/reset-password`;
    return this.http.post(resetPassEndpoint, newPasswordModel);
  }
  
  public isLoggedIn(): boolean {
    let userToken: string = null;
    try {
      userToken = this.getUserFromLocalStorage();
    }
    catch (err) {

    }
    return userToken !== null;
  }

  getUserFromLocalStorage(): string {
    try {
      return this.localStorageService.get<string>('userToken');
    }
    catch (err) {
      if (err instanceof SyntaxError) {
        throw new InvalidUserFormatException('Cannnot parse user from localStorage');
      }
      throw err;
    }
  }

  removeUserFromLocalStorage() {
    this.localStorageService.remove('userToken');
  }
}
