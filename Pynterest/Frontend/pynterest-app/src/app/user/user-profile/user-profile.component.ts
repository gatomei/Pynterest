import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from '@app/user/models/user-info';
import { JwtDecoderService } from '@app/shared/services/jwt-decoder.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserInfoService } from '../services/user-info.service';
import { UserFollowService } from '../services/user-follow.service';
import { FollowModel } from '../../shared/models/followModel';
import { DialogService } from '@app/shared/services/dialog.service';

import { BoardsService } from '../../shared/services/boards.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {

  public user: UserInfo;
  private username: String;
  private routeSub: Subscription;
  private subs: Subscription[];
  public imageUrl: SafeUrl
  private subscribedUser;

  constructor(
    private jwtDecoder: JwtDecoderService,
    private activatedRoute: ActivatedRoute,
    private userInfoService: UserInfoService,
    private userFollowService: UserFollowService,
    private sanitizer: DomSanitizer,
    private dialogService: DialogService,
    private boardsService: BoardsService,
  ) {
    this.subs = new Array<Subscription>();
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  ngOnInit(): void {

    this.user = {
      birthDate: new Date(),
      description: '',
      email: '',
      fullname: '',
      username: '',
      profilePicture: [],
    };

    this.getUserInfo();
  }

  getUserInfo() {
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      this.username = params['username'];
      this.subs.push(
        this.userInfoService.getInfo(this.username).subscribe(
          (data) => {
            this.user = data;
            this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
              'data:image/png;base64,' + data.profilePicture
            );
            this.getFollowers();
            this.getFollowing();
          },
          (error) => {
            console.log(error);
          }
        )
      );
    });
  }

  getFollowingNumber() {
    var followingNumber = this.userFollowService.getFollowingNumber();
    return followingNumber;
  }

  getFollowersNumber() {
    var followersNumber = this.userFollowService.getFollowersNumber();
    return followersNumber;
  }

  getFollowers() {
    this.userFollowService.getFollowedUsers(this.user.username).subscribe(
      (data) => {
        this.userFollowService.followersModel.next(data);
        this.setSubscribed();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getFollowing() {
    this.userFollowService.getUsersFollowingMe(this.user.username).subscribe(
      (data) => {
        this.userFollowService.followingModel.next(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public isHisPage(): boolean {
    return this.user.username == this.jwtDecoder.getUsername();
  }

  isSubscribed(): boolean {
    return this.subscribedUser;
  }

  setSubscribed() {
    this.subscribedUser = this.userFollowService.isSubscribedTo(this.jwtDecoder.getUsername());
  }

  unfollow() {
    this.subscribedUser = false;
    var subscribedUserUsername = this.user.username;
    this.userFollowService.unfollowUser(subscribedUserUsername).subscribe(
      (error) => { console.log(error); }
    );
  }

  follow() {
    this.subscribedUser = true;
    var subscribedUserUsername = this.user.username;
    this.userFollowService.followUser(subscribedUserUsername).subscribe(
      (error) => { console.log(error); }
    );
  }

  hasFollowers(): boolean {
    return this.userFollowService.hasFollowers();
  }

  hasFollowing(): boolean {
    return this.userFollowService.hasFollowing();
  }

  openFollowersDialog() {
    let currentUserFollowModel = this.userFollowService.followersModel.getValue();
    this.openFollowDialog("Followers", currentUserFollowModel);
  }

  openFollowingDialog() {
    let currentUserFollowModel = this.userFollowService.followingModel.getValue();
    this.openFollowDialog("Following", currentUserFollowModel);
  }

  openFollowDialog(dialogTitle: string, currentUserFollowModel: FollowModel[]) {
    this.userFollowService.getUsersFollowingMe(this.jwtDecoder.getUsername()).subscribe(
      (loggedInUserFollowingModel) => {
        let _dialogTitle = dialogTitle;
        this.dialogService.openFollowDialog(currentUserFollowModel, loggedInUserFollowingModel, _dialogTitle)
      },
      (error) => {
        console.log(error);
      }
    )
  }

  openAddPinDialog() {
    this.dialogService.openAddPinDialog();
  }

  openAddBoardDialog() {
    this.dialogService.openAddBoardDialog({
      userId: this.jwtDecoder.getId()
    })
  }
}
