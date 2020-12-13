import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from '@app/user/models/user-info';
import { JwtDecoderService } from '@app/shared/services/jwt-decoder.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserInfoService } from '../services/user-info.service';
import { UserFollowService } from '../services/user-follow.service';
import { FollowModel } from '../../shared/models/followModel';
import { DialogService } from '@app/shared/services/dialog.service';
import { BoardsService } from '../../shared/services/boards.service';
import { SelectBoardModel } from '@app/shared/models/selectBoardModel';
import { PhotosService } from '../../shared/services/photos.service';
import { ReadPhotoModel } from '../../shared/models/readPhotoModel';
import { NgxSpinnerService } from 'ngx-spinner';

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
  public selectBoardModel: SelectBoardModel[] = [];
  public readPhotoModel: ReadPhotoModel[] = [];
  public imageUrlBoards: SafeUrl[] = [];
  public isBoardsButtonClicked: boolean = false;
  public isPhotosButtonClicked: boolean = false;
  public lastPhotoSendId: number = null;
  public photoNumber: number = 20;
  private notEmptyPost: boolean = true;
  private notscrolly: boolean = true;
  private arePicturesLoaded: boolean = false;

  constructor(
    private jwtDecoder: JwtDecoderService,
    private activatedRoute: ActivatedRoute,
    private userInfoService: UserInfoService,
    private userFollowService: UserFollowService,
    private sanitizer: DomSanitizer,
    private dialogService: DialogService,
    private boardsService: BoardsService,
    private photosService: PhotosService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.subs = new Array<Subscription>();
    console.log("schimb pag")
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
            this.loadInitPhotos();
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
    this.dialogService.openAddPinDialog().subscribe(
      () => {
        this.getBoards();
      }
    )
  }

  openAddBoardDialog() {
    this.dialogService.openAddBoardDialog({
      userId: this.jwtDecoder.getId()
    }).subscribe(
      () => {
        this.getBoards();
      }
    )
  }

  getBoardsOnClick() {
    this.isBoardsButtonClicked = true;
    this.isPhotosButtonClicked = false;
    this.getBoards();
  }

  async getBoards() {
    this.selectBoardModel = [];
    await this.boardsService.getBoards(this.user.username).subscribe(
      (data) => {
        this.selectBoardModel = data;
        this.setBoardsImageUrl();
      },
      (error) => console.log(error));
  }

  setBoardsImageUrl() {
    this.selectBoardModel.forEach(board => {
      if (board.numberOfPictures != 0) {
        board.firstPicture = this.sanitizer.bypassSecurityTrustUrl(
          'data:image/png;base64,' + board.firstPicture);
      }
      else {
        board.firstPicture = null;
      }
    })
  }

  openDeleteBoardDialog(index) {
    let boardId = this.selectBoardModel[index].boardId;
    this.dialogService.openDeleteBoardDialog(
      { boardId: boardId }).subscribe(
        (result) => {
          if (result == true) {
            this.selectBoardModel = this.selectBoardModel.filter(it => it.boardId != boardId);
          }
        }
      )
  }

  getPhotosOnClick() {
    this.isPhotosButtonClicked = true;
    this.isBoardsButtonClicked = false;
    this.loadInitPhotos();
    this.arePicturesLoaded = true;
  }

  loadInitPhotos() {
    this.photosService.getUserPhotos(this.user.username, this.photoNumber, this.lastPhotoSendId).subscribe(
      (data) => {
        this.readPhotoModel = data;
        this.notEmptyPost = data.length != 0;
        this.arePicturesLoaded = true;
        this.readPhotoModel = this.setPhotosImageUrl(this.readPhotoModel);
      }
    )
  }

  loadNextPhotos() {
    this.lastPhotoSendId = this.readPhotoModel[this.readPhotoModel.length - 1].photoId;

    this.photosService.getUserPhotos(this.user.username, this.photoNumber, this.lastPhotoSendId).subscribe(
      (data) => {
        this.spinner.hide();
        this.notEmptyPost = data.length != 0;
        var nextPhotos = data;
        nextPhotos = this.setPhotosImageUrl(nextPhotos);
        this.readPhotoModel = this.readPhotoModel.concat(nextPhotos);
        this.notscrolly = true;
      }
    )
  }

  setPhotosImageUrl(photos: ReadPhotoModel[]) {
    photos.forEach(photo => {
      photo.pictureData = this.sanitizer.bypassSecurityTrustUrl(
        'data:image/png;base64,' + photo.pictureData);
    })

    return photos;
  }

  onScroll() {
    if (this.arePicturesLoaded && this.notscrolly && this.notEmptyPost) {
      this.spinner.show();
      this.notscrolly = false;
      this.loadNextPhotos();
    }
  }

  navigateToBoard(index) {
    let boardName = this.selectBoardModel[index].title
    this.router.navigate([`${this.user.username}/boards/${boardName}`]);
  }

}
