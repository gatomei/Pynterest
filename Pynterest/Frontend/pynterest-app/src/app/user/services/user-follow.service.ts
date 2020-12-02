import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FollowModel } from '@app/shared/models/followModel';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtDecoderService } from '../../shared/services/jwt-decoder.service';


@Injectable({
  providedIn: 'root'
})
export class UserFollowService {


  public followersModel: BehaviorSubject<FollowModel[]> = new BehaviorSubject([]);
  public followingModel: BehaviorSubject<FollowModel[]> = new BehaviorSubject([]);

  private loggedInUserUsername: string;

  constructor(
    private httpClient: HttpClient,
    private jwtDecoderService: JwtDecoderService
  ) {
    this.loggedInUserUsername = this.jwtDecoderService.getUsername();
  }

  followUser(followedUserUsername: string) {
    const followUserEnpoint = `${environment.baseAPIAuth}/user/${this.loggedInUserUsername}/followings/${followedUserUsername}`;
    return this.httpClient.put<string>(followUserEnpoint, null);
  }

  unfollowUser(unfollowedUserUsername: string) {
    const unfollowUserEnpoint = `${environment.baseAPIAuth}/user/${this.loggedInUserUsername}/followings/${unfollowedUserUsername}`;
    return this.httpClient.delete<string>(unfollowUserEnpoint);
  }

  getUsersFollowingMe(username: string) {
    const getUsersFollowingMeEnpoint = `${environment.baseAPIAuth}/user/${username}/followings`;
    return this.httpClient.get<FollowModel[]>(getUsersFollowingMeEnpoint);
  }

  getFollowedUsers(username: string) {
    const getFollowedUsersEnpoint = `${environment.baseAPIAuth}/user/${username}/followers`;
    return this.httpClient.get<FollowModel[]>(getFollowedUsersEnpoint);
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
