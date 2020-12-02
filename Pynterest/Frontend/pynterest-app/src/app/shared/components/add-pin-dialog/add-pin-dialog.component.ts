import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { UserInfoService } from '@app/user/services/user-info.service';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { PhotoModel } from '../../models/photoModel';
import { PhotosService } from '@app/shared/services/photos.service';
import { BoardsService } from '../../services/boards.service';
import { SelectBoardModel } from '../../models/selectBoardModel';
import { DialogService } from '../../services/dialog.service';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { take, takeUntil } from 'rxjs/operators';
import { CategoryService } from '../../services/category.service';
import { WriteCategoryModel } from '@app/shared/models/writeCategoryModel';
import { ReadCategoryModel } from '../../models/readCategoryModel';

@Component({
  selector: 'app-add-pin-dialog',
  templateUrl: './add-pin-dialog.component.html',
  styleUrls: ['./add-pin-dialog.component.scss']
})
export class AddPinDialogComponent implements OnInit {


  public boardCtrl: FormControl = new FormControl();
  public boardFilterCtrl: FormControl = new FormControl();
  public filteredBoards: ReplaySubject<SelectBoardModel[]> = new ReplaySubject<SelectBoardModel[]>(1);
  @ViewChild('singleSelect') singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>();

  public addPinForm: FormGroup = this.formBuilder.group({
    title: [, { validators: [Validators.required], updateOn: "change" }],
    description: [, { updateOn: "change" }],
    category: [, { validators: [Validators.required], updateOn: "change" }],
    photo: [, { validators: [Validators.required], updateOn: "change" }],
    board: [, { validators: [Validators.required], updateOn: "change" }]
  })

  public categoryList: ReadCategoryModel[] = [];

  faArrowAltCircleUp = faArrowAltCircleUp;

  public uploadedValidPhoto: boolean = true;
  public loggedInUserUsername: string;
  public imgUrl: SafeUrl;
  public imagePath: string;
  public url: any;
  public isPhotoSelected: boolean = false;
  public selectBoardModel: SelectBoardModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private jwtDecoderService: JwtDecoderService,
    private userInfoService: UserInfoService,
    private photosService: PhotosService,
    private boardsService: BoardsService,
    private dialogService: DialogService,
    private categoryService: CategoryService
  ) {
    this.loggedInUserUsername = this.jwtDecoderService.getUsername();
    this.setLoggedInUserImageUrl();
    this.getBoards();
    this.getCategories();
    let c: WriteCategoryModel = { name: "Sport" }
    // this.categoryService.addCategory(c).subscribe((error) => console.log(error))
  }

  getBoards() {
    this.boardsService.getBoards(this.loggedInUserUsername).subscribe(
      (data) => {
        this.selectBoardModel = data;
        this.filteredBoards.next(this.selectBoardModel.slice());

        this.boardFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterBanks();
          });
      },
      (error) => console.log(error));

  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => { this.categoryList = data; },
      (error) => { console.log(error); }
    )
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  protected setInitialValue() {
    this.filteredBoards
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: SelectBoardModel, b: SelectBoardModel) => a && b && a.title === b.title;
      });
  }

  protected filterBanks() {
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
      this.selectBoardModel.filter(bank => bank.title.toLowerCase().indexOf(search) > -1)
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
    _photoInBytes = _photoInBytes.split(",")[1]
    let _categoryName = this.addPinForm.get("category").value;

    if (_categoryName == null) {
      _categoryName = "Others/Everything";
    }

    let photo: PhotoModel = {
      title: this.addPinForm.get("title").value,
      description: this.addPinForm.get("description").value,
      categoryName: _categoryName,
      pictureData: _photoInBytes
    }

    console.log(photo);
    console.log(this.addPinForm.get("board").value);

    this.photosService.addPhoto(photo).subscribe((error) => console.log(error));
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
    })
    this.singleSelect.close();
  }

  openAddCategoryModal() {
    this.dialogService.openAddCategoryDialog();
  }
}