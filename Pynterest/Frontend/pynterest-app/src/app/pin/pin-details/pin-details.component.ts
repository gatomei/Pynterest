import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotosService } from '@app/shared/services/photos.service';
import { PinDetails } from '@app/shared/models/pinDetailsModel';
import { UserInfoService } from '@app/user/services/user-info.service';
import { ReadComment } from '@app/shared/models/readCommentModel';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { WriteComment } from '@app/shared/models/writeCommentModel';
import { JwtDecoderService } from '@app/shared/services/jwt-decoder.service';
import { BoardsService } from '@app/shared/services/boards.service';
import { DialogService } from '@app/shared/services/dialog.service';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { SelectBoardModel } from '@app/shared/models/selectBoardModel';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pin-details',
  templateUrl: './pin-details.component.html',
  styleUrls: ['./pin-details.component.scss'],
})
export class PinDetailsComponent implements OnInit {
  public pin: PinDetails;
  public isLoaded: boolean = false;
  public comments: ReadComment[];
  public commentForm: FormGroup;
  public isCommenting: boolean = false;
  public loggedUserImage: SafeUrl;
  public photoUserImage: SafeUrl;
  public boardSelectForm: FormGroup;
  public imageUrlBoards: SafeUrl[] = [];
  public selectBoardModel: SelectBoardModel[] = [];

  public filteredBoards: ReplaySubject<SelectBoardModel[]> = new ReplaySubject<SelectBoardModel[]>(1);
  @ViewChild('boardSelect') boardSelect: MatSelect;

  protected _onDestroy = new Subject<void>();

  constructor(
    private jwtDecoder: JwtDecoderService,
    private sanitizer: DomSanitizer,
    private photosService: PhotosService,
    private userService: UserInfoService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private boardsService: BoardsService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.photosService.getPhotoById(id).subscribe(
      (data) => {
        this.pin = data;
        this.getCommentsForPhoto(this.pin.photoId);
        this.setAuthorPhotoUserImage();
      },
      (error) => {
        console.log(error);
      }
    );

    this.commentForm = this.formBuilder.group({
      content: ['', { validators: [Validators.required], updateOn: 'change' }],
    });

    this.boardSelectForm = this.formBuilder.group({
      boardFilterCtrl: ['', { updateOn: 'change' }],
      board: [, { updateOn: 'change' }],
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  getCommentsForPhoto(id: string) {
    this.photosService.getCommentsForPhoto(id).subscribe(
      (data) => {
        this.comments = data;
        this.setLoggedUserImageUrl();
        this.isLoaded = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getImageUrl() {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + this.pin.pictureData);
  }

  addComment(formDirective: FormGroupDirective) {
    const comment: WriteComment = {
      content: this.commentForm.get('content').value,
    };

    this.photosService.addCommentToPhoto(comment, this.pin.photoId).subscribe(
      (response: any) => {
        const header = response.headers.get('Location');
        this.photosService.getCommentForPhoto(this.pin.photoId, header).subscribe(
          (data) => {
            this.comments = this.comments.concat(data);

          },
          (error) => {
            console.log(error);
          }
        );
        this.dropComment();
        formDirective.resetForm();
      },
      (error) => {
        console.log(error);
        this.dropComment();
        formDirective.resetForm();
      }
    );
  }

  dropComment() {
    this.commentForm.reset();
    this.isCommenting = false;
  }
  addingComment() {
    this.isCommenting = true;
  }

  isOwnComment(username: String) {
    return username == this.jwtDecoder.getUsername();
  }

  deleteComment(commentId: string) {
    this.photosService.deleteCommentFromPhoto(this.pin.photoId, commentId).subscribe(
      () => {
        this.comments = this.comments.filter((comm) => comm.commentId != commentId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setLoggedUserImageUrl() {
    this.userService.getInfo(this.jwtDecoder.getUsername()).subscribe(
      (user) => {
        this.loggedUserImage = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + user.profilePicture);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setAuthorPhotoUserImage(){
    this.userService.getInfo(this.pin.username).subscribe(
      (user) => {
        this.photoUserImage = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + user.profilePicture);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openAddBoardDialog() {
    this.dialogService.openAddBoardDialog({
      userId: this.jwtDecoder.getId(),
    });
    this.boardSelect.close();
  }

  getBoards() {
    this.boardsService.getBoards(this.jwtDecoder.getUsername()).subscribe(
      (data) => {
        this.selectBoardModel = data;
        this.setImageUrlArray();
        this.filteredBoards.next(this.selectBoardModel.slice());

        this.boardSelectForm
          .get('boardFilterCtrl')
          .valueChanges.pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterBoards();
          });
      },
      (error) => console.log(error)
    );
  }

  protected filterBoards() {
    if (!this.selectBoardModel) {
      return;
    }
    let search = this.boardSelectForm.get('boardFilterCtrl').value;
    if (!search) {
      this.filteredBoards.next(this.selectBoardModel.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredBoards.next(this.selectBoardModel.filter((board) => board.title.toLowerCase().indexOf(search) > -1));
  }

  setImageUrlArray() {
    this.selectBoardModel.forEach((board) => {
      if (board.firstPicture.length) {
        this.imageUrlBoards.push(this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + board.firstPicture));
      } else {
        this.imageUrlBoards.push(null);
      }
    });
  }

  addPinToBoard() {
    if (this.boardSelectForm.get('board').value != null) {
      let boardId = this.boardSelectForm.get('board').value.boardId;
      this.photosService.addPhotoToBoard(Number(this.pin.photoId), boardId).subscribe((error) => {
        console.log(error);
      });
    }
  }
  navigateToUser(){
    this.router.navigate([`users/${this.pin.username}/profile`]);
  }
}
