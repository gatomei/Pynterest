import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PinDetails } from '@app/shared/models/pinDetailsModel';
import { DialogService } from '@app/shared/services/dialog.service';
import { JwtDecoderService } from '@app/shared/services/jwt-decoder.service';
import { PhotosService } from '@app/shared/services/photos.service';
import { UserInfo } from '@app/user/models/user-info';
import { UserInfoService } from '@app/user/services/user-info.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss'],
})
export class BoardDetailsComponent implements OnInit {
  public photos: PinDetails[] = new Array<PinDetails>();
  private requestChunk = 12;
  private notEmptyPost = true;
  private notscrolly = true;
  public isLoaded = false;
  public boardTitle: string = '';
  public user: UserInfo;
  public imageUrl: SafeUrl;

  ngOnInit(): void {
    this.spinner.show();
    this.getBoardTitle();
    this.getUserFullname();
    this.loadInitPhotos();
  }

  constructor(
    private spinner: NgxSpinnerService,
    private photosService: PhotosService,
    private activatedRoute: ActivatedRoute,
    private userInfoService: UserInfoService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private jwtDecoder: JwtDecoderService,
    private dialogService: DialogService
  ) {}

  getBoardTitle() {
    this.boardTitle = this.activatedRoute.snapshot.paramMap.get('boardName');
  }

  getUserFullname() {
    let username = this.activatedRoute.snapshot.paramMap.get('username');
    this.userInfoService.getInfo(username).subscribe(
      (data) => {
        this.user = data;
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + data.profilePicture);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadInitPhotos() {
    let username = this.activatedRoute.snapshot.paramMap.get('username');
    this.photosService.getPhotosFromBoard(this.boardTitle, this.requestChunk, null, username)
    .subscribe(
      (data) => {
      if(data.length==0)
      {
       this.notEmptyPost=false;
      }
        this.photos = data;
        this.spinner.hide();
        this.isLoaded = true;
      },
      (error) => {
        console.log(error);
      }
    );

  }

  onScroll() {
    if (this.isLoaded) {
      if (this.notscrolly && this.notEmptyPost) {
        this.spinner.show();
        this.notscrolly = false;
        this.loadNextPhotos();
      }
    }
  }

  loadNextPhotos() {
    let lastPhotoSentId = this.photos[this.photos.length - 1].photoId;
    let username = this.activatedRoute.snapshot.paramMap.get('username');
    this.photosService.getPhotosFromBoard(this.boardTitle, this.requestChunk, lastPhotoSentId, username).subscribe(
      (data) => {
        this.spinner.hide();
        if (data.length == 0) this.notEmptyPost = false;
        this.photos = this.photos.concat(data);
        this.notscrolly = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  navigateToUser() {
    this.router.navigate([`users/${this.user.username}/profile`]);
  }
  openDeleteBoardDialog() {
    let boardId = 1;
    this.dialogService.openDeleteBoardDialog({ boardId: boardId }).subscribe((result) => {
      if (result == true) {
        this.router.navigate([`users/${this.user.username}/profile`]);
      }
    });
  }

  public isHisPage(): boolean {
    return this.user.username == this.jwtDecoder.getUsername();
  }
}
