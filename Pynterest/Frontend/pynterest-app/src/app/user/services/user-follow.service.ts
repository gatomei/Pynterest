import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FollowModel } from '@app/shared/models/followModel';


@Injectable({
  providedIn: 'root'
})
export class UserFollowService {

  constructor(private httpClient: HttpClient) { }

  followUser(loggedUserId: number, username: string) {
    const authenticateEnpoint = `${environment.baseAPIAuth}/user/${loggedUserId}/followings?username=${username}`;
    return this.httpClient.put<string>(authenticateEnpoint, null);
  }

  unfollowUser(loggedUserId: number, username: string) {
    const authenticateEnpoint = `${environment.baseAPIAuth}/user/${loggedUserId}/unfollowing?username=${username}`;
    return this.httpClient.put<string>(authenticateEnpoint, null);
  }

  getUsersFollowingMe(username: string) {
    const authenticateEnpoint = `${environment.baseAPIAuth}/user/followings?username=${username}`;
    return this.httpClient.get<FollowModel[]>(authenticateEnpoint);
  }

  getFollowedUsers(username: string) {
    const authenticateEnpoint = `${environment.baseAPIAuth}/user/followers?username=${username}`;
    return this.httpClient.get<FollowModel[]>(authenticateEnpoint);
  }
}
