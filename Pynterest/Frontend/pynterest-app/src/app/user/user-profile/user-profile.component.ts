import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from '@app/user/models/user-info';
import { JwtDecoderService } from '@app/shared/services/jwt-decoder.service';
import { Subscription } from 'rxjs';
import { UserInfoService } from '../services/user-info.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { FollowDialogComponent } from '@app/shared/components/follow-dialog/follow-dialog.component';
import { FollowDialogService } from '../../shared/services/follow-dialog.service';
import { FollowDialogModel } from '@app/core/models/followDialogModel';
import {BoardsService} from '../../shared/services/boards.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  public subscribers: number = 0;
  public subscriptions: number = 1;
  public user: UserInfo;
  public subscribersDialogModels: FollowDialogModel[];
  public subscriptionsDialogModels: FollowDialogModel[];
  public suscribedUser: boolean = true;
  private username: String;
  private routeSub: Subscription;
  private subs: Subscription[];
  public imageUrl: SafeUrl = '';

  constructor(
    private jwtDecoder: JwtDecoderService,
    private activatedRoute: ActivatedRoute,
    private userInfoService: UserInfoService,
    private sanitizer: DomSanitizer,
    private localstorageService: LocalStorageService,
    private followDialogService: FollowDialogService,
    private boardsService:BoardsService,
  ) {
    this.subs = new Array<Subscription>();
    this.subscribersDialogModels = new Array<FollowDialogModel>();
    this.subscriptionsDialogModels = new Array<FollowDialogModel>();
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  ngOnInit(): void {

    //de test
    //////////////////////////////////////////////////////////////////////////////////////////
    this.subscribersDialogModels.push({ userFullname: 'pufi', dialogTitle: "Subscribers" });
    this.subscribersDialogModels.push({ userFullname: 'puficea', dialogTitle: "Subscribers" });

    this.subscriptionsDialogModels.push({ userFullname: 'piki', dialogTitle: "Subscriptions" });
    this.subscriptionsDialogModels.push({ userFullname: 'pikish', dialogTitle: "Subscriptions" });
    //////////////////////////////////////////////////////////////////////////////////////////////

    this.user = {
      birthDate: new Date(),
      description: '',
      email: '',
      fullname: '',
      username: '',
      profilePicture: [],
    };

    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      this.username = params['username'];
      this.subs.push(
        this.userInfoService.getInfo(this.username).subscribe(
          (data) => {
            this.user = data;
            this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
              'data:image/png;base64,' + data.profilePicture
            );
            this.user.profilePicture = [];
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
  }

  subscribe() {
    this.suscribedUser = true;
  }

  hasSubscriptions(): boolean {
    return this.subscriptions != 0;
  }

  hasSubscribers(): boolean {
    return this.subscribers != 0;
  }

  openSubscribersDialog() {
    this.followDialogService.openDialog(this.subscribersDialogModels);
  }


  openSubscriptionsDialog() {
    this.followDialogService.openDialog(this.subscriptionsDialogModels);
  }

  openAddBoardDialog(){
    this.boardsService.openDialog();
  }
}
