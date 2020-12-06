import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SelectBoardModel } from '@app/shared/models/selectBoardModel';
import { BoardsService } from '@app/shared/services/boards.service';
import { DialogService } from '@app/shared/services/dialog.service';
import { JwtDecoderService } from '@app/shared/services/jwt-decoder.service';
import { PhotosService } from '@app/shared/services/photos.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-to-board-form',
  templateUrl: './add-to-board-form.component.html',
  styleUrls: ['./add-to-board-form.component.scss'],
})
export class AddToBoardFormComponent implements OnInit {
  @Input() public photoId: string;
  public boardSelectForm: FormGroup;
  public imageUrlBoards: SafeUrl[] = [];
  public selectBoardModel: SelectBoardModel[] = [];
  public isSaved: boolean = false;

  public filteredBoards: ReplaySubject<SelectBoardModel[]> = new ReplaySubject<SelectBoardModel[]>(1);
  @ViewChild('boardSelect') boardSelect: MatSelect;

  protected _onDestroy = new Subject<void>();

  constructor(
    private jwtDecoder: JwtDecoderService,
    private boardsService: BoardsService,
    private dialogService: DialogService,
    private sanitizer: DomSanitizer,
    private photosService: PhotosService,
    private formBuilder: FormBuilder,

  ) {}

  ngOnInit(): void {
    this.boardSelectForm = this.formBuilder.group({
      boardFilterCtrl: ['', { updateOn: 'change' }],
      board: [, { updateOn: 'change' }],
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
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
      this.photosService.addPhotoToBoard(Number(this.photoId), boardId).subscribe(
        () => {
          this.isSaved = true;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
