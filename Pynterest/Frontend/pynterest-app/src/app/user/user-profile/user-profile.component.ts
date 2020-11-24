import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from '@app/user/models/user-info';
import { JwtDecoderService } from '@app/shared/services/jwt-decoder.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { FollowDialogService } from '../../shared/services/follow-dialog.service';
import { UserInfoService } from '../services/user-info.service';
import { FollowModel } from '@app/shared/models/followModel';
import { UserFollowService } from '../services/user-follow.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  public followersNumber: number = 0;
  public followingNumber: number = 0;
  public user: UserInfo;
  public followersModel: FollowModel[];
  public followingModel: FollowModel[];
  public suscribedUser: boolean = true;
  private username: String;
  private routeSub: Subscription;
  private subs: Subscription[];

  constructor(
    private jwtDecoder: JwtDecoderService,
    private activatedRoute: ActivatedRoute,
    private userInfoService: UserInfoService,
    private userFollowService: UserFollowService,
    private sanitizer: DomSanitizer,
    private localstorageService: LocalStorageService,
    private followDialogService: FollowDialogService
  ) {
    this.subs = new Array<Subscription>();
    this.followersModel = new Array<FollowModel>();
    this.followingModel = new Array<FollowModel>();
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
    // this.getFollowers();
    // this.getFollowing();

  }

  getFollowers() {
    this.userFollowService.getFollowedUsers(this.user.username).subscribe(
      (data) => {
        this.followingModel = data;
        this.followingNumber = this.followingModel.length;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getFollowing() {
    this.userFollowService.getUsersFollowingMe(this.user.username).subscribe(
      (data) => {
        this.followersModel = data;
        this.followersNumber = this.followersModel.length;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getUserInfo() {
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      this.username = params['username'];
      this.subs.push(
        this.userInfoService.getInfo(this.username).subscribe(
          (data) => {
            this.user = data;
            this.user.profilePicture = this.sanitizer.bypassSecurityTrustUrl(
              'data:image/png;base64,' + data.profilePicture
            );
          },
          (error) => {
            console.log(error);
          }
        )
      );
    });

  }

  public isHisPage(): boolean {
    return this.user.username == this.jwtDecoder.getUsername();

  }

  isSubscribed(id): boolean {
    return this.suscribedUser;
  }

  unsubscribe() {
    this.suscribedUser = false;
    var subscribedUserUsername = this.user.username;
    var loggedInUserId = +this.jwtDecoder.getId();
    this.userFollowService.unfollowUser(loggedInUserId, subscribedUserUsername);
  }

  subscribe() {
    this.suscribedUser = true;
    var subscribedUserUsername = this.user.username;
    var loggedInUserId = +this.jwtDecoder.getId();
    this.userFollowService.followUser(loggedInUserId, subscribedUserUsername);
  }

  hasFollowers(): boolean {
    return this.followingNumber != 0;
  }

  hasFollowing(): boolean {
    return this.followersNumber != 0;
  }

  openFollowersDialog() {
    var dialogTitle = 'Followers'
    this.followDialogService.openDialog(this.followersModel, dialogTitle);
  }


  openFollowingDialog() {
    var dialogTitle = 'Following'
    this.followDialogService.openDialog(this.followingModel, dialogTitle);
  }
}
