import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '@app/user/models/user-info';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private httpClient: HttpClient) { }

  getInfo(username: String) {
    const userInfoEndPoint = `${environment.baseAPIAuth}/user?username=${username}`;
    return this.httpClient.get<UserInfo>(userInfoEndPoint);
  }
}
