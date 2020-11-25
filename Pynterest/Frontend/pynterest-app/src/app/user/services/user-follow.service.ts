import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FollowModel } from '@app/shared/models/followModel';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserFollowService {


  public followersModel: BehaviorSubject<FollowModel[]> = new BehaviorSubject([]);
  public followingModel: BehaviorSubject<FollowModel[]> = new BehaviorSubject([]);


  constructor(private httpClient: HttpClient) { }

  followUser(username: string) {
    const authenticateEnpoint = `${environment.baseAPIAuth}/user/followings/${username}`;
    return this.httpClient.put<string>(authenticateEnpoint, null);
  }

  unfollowUser(username: string) {
    const authenticateEnpoint = `${environment.baseAPIAuth}/user/followings/${username}`;
    return this.httpClient.delete<string>(authenticateEnpoint);
  }

  getUsersFollowingMe(username: string) {
    const authenticateEnpoint = `${environment.baseAPIAuth}/user/${username}/followings`;
    return this.httpClient.get<FollowModel[]>(authenticateEnpoint);
  }

  getFollowedUsers(username: string) {
    const authenticateEnpoint = `${environment.baseAPIAuth}/user/${username}/followers`;
    return this.httpClient.get<FollowModel[]>(authenticateEnpoint);
  }

  isSubscribedTo(loggedInUsername: string): boolean {
    var subscribedUser: boolean = false;
    this.followersModel.getValue().forEach(model => {
      if (model.username == loggedInUsername) {
        subscribedUser = true;
      }
      else {
        subscribedUser = false;
      }
    })

    return subscribedUser;
  }


  hasFollowers() {
    var followersNumber = this.getFollowersNumber();
    return followersNumber != 0;
  }

  hasFollowing() {
    var followingNumber = this.getFollowingNumber();
    return followingNumber != 0;
  }

  getFollowersNumber() {
    var followersNumber = this.followersModel.getValue().length;
    return followersNumber;
  }

  getFollowingNumber() {
    var followingNumber = this.followingModel.getValue().length;
    return followingNumber;
  }


}
