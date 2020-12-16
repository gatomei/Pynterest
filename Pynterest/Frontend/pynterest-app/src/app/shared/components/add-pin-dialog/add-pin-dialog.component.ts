import { ReadCategoryModel } from './../../models/readCategoryModel';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { UserInfoService } from '@app/user/services/user-info.service';
import { faArrowAltCircleUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { PhotoModel } from '../../models/photoModel';
import { PhotosService } from '@app/shared/services/photos.service';
import { BoardsService } from '../../services/boards.service';
import { SelectBoardModel } from '../../models/selectBoardModel';
import { DialogService } from '../../services/dialog.service';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { take, takeUntil } from 'rxjs/operators';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-pin-dialog',
  templateUrl: './add-pin-dialog.component.html',
  styleUrls: ['./add-pin-dialog.component.scss']
})
export class AddPinDialogComponent implements OnInit {


  public boardFilterCtrl: FormControl = new FormControl();
  public filteredBoards: ReplaySubject<SelectBoardModel[]> = new ReplaySubject<SelectBoardModel[]>(1);
  @ViewChild('boardSelect') boardSelect: MatSelect;

  public categoryFilterCtrl: FormControl = new FormControl();
  public filteredCategories: ReplaySubject<ReadCategoryModel[]> = new ReplaySubject<ReadCategoryModel[]>(1);
  @ViewChild('categorySelect') categorySelect: MatSelect;

  public imageUrlBoards: SafeUrl[] = [];

  protected _onDestroy = new Subject<void>();

  public addPinForm: FormGroup = this.formBuilder.group({
    title: [, { validators: [Validators.required], updateOn: "change" }],
    description: [, { updateOn: "change" }],
    category: [, { validators: [Validators.required], updateOn: "change" }],
    photo: [, { validators: [Validators.required], updateOn: "change" }],
    board: [, { validators: [Validators.required], updateOn: "change" }]
  })


  faArrowAltCircleUp = faArrowAltCircleUp;

  public categoryList: ReadCategoryModel[] = [];
  public uploadedValidPhoto: boolean = true;
  public loggedInUserUsername: string;
  public imgUrl: SafeUrl;
  public imagePath: string;
  public url: any;
  public isPhotoSelected: boolean = false;
  public selectBoardModel: SelectBoardModel[] = [];
  public addBoardLoading: boolean = false;
  public currentNumberOfBords: number;
  public addCategoryLoading: boolean = false;
  public currentNumberOfCategories: number;

  public areBoardsLoading: boolean = true;
  public areCategoriesLoading: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private jwtDecoderService: JwtDecoderService,
    private userInfoService: UserInfoService,
    private photosService: PhotosService,
    private boardsService: BoardsService,
    private dialogService: DialogService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.loggedInUserUsername = this.jwtDecoderService.getUsername();
    this.setLoggedInUserImageUrl();
    this.getBoards();
    this.getCategories();
  }

  ngAfterViewInit() {
    this.setBoardsInitialValues();
    this.setCategoriesInitialValues();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  getBoards() {
    this.boardsService.getBoards(this.loggedInUserUsername).subscribe(
      (data) => {
        this.selectBoardModel = data;
        this.setImageUrl();
        this.filteredBoards.next(this.selectBoardModel.slice());

        this.boardFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterBoards();
          });

        if (this.selectBoardModel.length == (this.currentNumberOfBords + 1)) {
          this.addBoardLoading = false;
          this.currentNumberOfBords = this.selectBoardModel.length;
        }

        this.areBoardsLoading = false;
        this.areCategoriesLoading = false;

      },
      (error) => console.log(error));

  }

  setImageUrl() {
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

  async getCategories() {
    await this.categoryService.getCategories().subscribe(
      (data) => {
        this.categoryList = data;

        this.filteredCategories.next(this.categoryList.slice());

        this.categoryFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterCategories();
          });

        if (this.categoryList.length == (this.currentNumberOfCategories + 1)) {
          this.addCategoryLoading = false;
          this.currentNumberOfCategories = this.categoryList.length;
        }
      },
      (error) => { console.log(error); }
    )
  }


  protected setBoardsInitialValues() {
    this.filteredBoards
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.boardSelect.compareWith = (selectBoardModel1: SelectBoardModel, selectBoardModel2: SelectBoardModel) => selectBoardModel1 && selectBoardModel2 && selectBoardModel1.title === selectBoardModel2.title;
      });
  }

  protected setCategoriesInitialValues() {
    this.filteredCategories
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.categorySelect.compareWith = (readCategoryModel1: ReadCategoryModel, readCategoryModel2: ReadCategoryModel) => readCategoryModel1 && readCategoryModel2 && readCategoryModel1.name === readCategoryModel2.name;
      });
  }

  protected filterBoards() {
    if (!this.selectBoardModel) {
      return;
    }
    let search = this.boardFilterCtrl.value;
    if (!search) {
      this.filteredBoards.next(this.selectBoardModel.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredBoards.next(
      this.selectBoardModel.filter(board => board.title.toLowerCase().indexOf(search) > -1)
    );
  }


  protected filterCategories() {
    if (!this.filteredCategories) {
      return;
    }
    let search = this.categoryFilterCtrl.value;
    if (!search) {
      this.filteredCategories.next(this.categoryList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCategories.next(
      this.categoryList.filter(category => category.name.toLowerCase().indexOf(search) > -1)
    );
  }

  setLoggedInUserImageUrl() {
    this.userInfoService.getInfo(this.loggedInUserUsername).subscribe(
      (data) => {
        this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(
          'data:image/png;base64,' + data.profilePicture
        );
      },
      (error) => {
        console.log(error);
      });
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  async submitAddPinForm(_addPinForm) {

    this.addPinForm = _addPinForm;

    let _photoInBytes = <string>await this.toBase64(this.addPinForm.get("photo").value?.files[0]);
    _photoInBytes = _photoInBytes.split(",")[1];

    let _categoryName = this.addPinForm.get("category").value.name;
    let boardId = this.addPinForm.get("board").value.boardId;

    let photo: PhotoModel = {
      title: this.addPinForm.get("title").value,
      description: this.addPinForm.get("description").value,
      categoryName: _categoryName,
      pictureData: _photoInBytes
    }

    this.photosService.addPhoto(photo).subscribe(
      (response: any) => {
        const photoId = response.headers.get('Location');
        this.photosService.addPhotoToBoard(photoId, boardId).subscribe(
          (error) => { console.log(error); }
        )
      },
      (error) => console.log(error));
  }

  onFileChanged(event) {

    const files = event.target.files;
    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.url = "";
      this.uploadedValidPhoto = false;
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
    this.isPhotoSelected = true;
    this.uploadedValidPhoto = true;
  }

  openAddBoardDialog() {
    this.dialogService.openAddBoardDialog({
      userId: this.jwtDecoderService.getId()
    }).subscribe(
      (result) => {
        if (result == true) {
          this.addBoardLoading = true;
          this.currentNumberOfBords = this.selectBoardModel.length;
          this.getBoards();
        }
      }
    )
    this.boardSelect.close();
  }

  openAddCategoryModal() {
    this.dialogService.openAddCategoryDialog().subscribe(
      (result) => {
        if (result == true) {
          this.addCategoryLoading = true;
          this.currentNumberOfCategories = this.categoryList.length;
          this.getCategories();
        }
      }
    )
    this.categorySelect.close();
  }

}